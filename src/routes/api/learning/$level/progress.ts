import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/db";
import { users, progress } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import type { Level } from "@/types/learning";
import * as kanaContent from "../../../../content/kana/index";
import * as n5Content from "../../../../content/n5/index";
import * as n4Content from "../../../../content/n4/index";
import * as n3Content from "../../../../content/n3/index";
import * as n2Content from "../../../../content/n2/index";
import * as n1Content from "../../../../content/n1/index";

const LEVEL_CONTENT: Record<string, { level?: Level }> = {
    kana: kanaContent,
    n5: n5Content,
    n4: n4Content,
    n3: n3Content,
    n2: n2Content,
    n1: n1Content,
};

const VALID_LEVELS = ["kana", "n5", "n4", "n3", "n2", "n1"] as const;
type ValidLevel = (typeof VALID_LEVELS)[number];

export const Route = createFileRoute("/api/learning/$level/progress")({
    server: {
        handlers: {
            GET: async ({ request, params }) => {
                const { level } = params;

                // Validate level
                if (!VALID_LEVELS.includes(level as ValidLevel)) {
                    return Response.json(
                        { error: "Level tidak ditemukan" },
                        { status: 404 },
                    );
                }

                // Get Better Auth session
                const sessionRes = await auth.handler(
                    new Request(
                        new URL("/api/auth/get-session", request.url),
                        { headers: request.headers },
                    ),
                );

                // Better Auth's get-session returns HTTP 200 with { user: null } for
                // unauthenticated requests, so !sessionRes.ok only catches real server errors.
                if (!sessionRes.ok) {
                    return Response.json({ error: "Auth service unavailable" }, { status: 503 });
                }

                const sessionData = (await sessionRes.json()) as {
                    user?: { id: string; email: string } | null;
                };

                if (!sessionData?.user?.email) {
                    return Response.json(
                        { error: "Unauthorized" },
                        { status: 401 },
                    );
                }

                // Find app user by email (progress table references users.id, not ba_user.id)
                const [appUser] = await db
                    .select({ id: users.id })
                    .from(users)
                    .where(eq(users.email, sessionData.user.email))
                    .limit(1);

                if (!appUser) {
                    return Response.json(
                        { error: "Unauthorized" },
                        { status: 401 },
                    );
                }

                // Query progress rows for this user + level
                const progressRows = await db
                    .select({
                        step_slug: progress.step_slug,
                        completed: progress.completed,
                    })
                    .from(progress)
                    .where(
                        and(
                            eq(progress.user_id, appUser.id),
                            eq(progress.level, level),
                        ),
                    );

                const completedSlugs = new Set(
                    progressRows
                        .filter((r) => r.completed)
                        .map((r) => r.step_slug),
                );

                // Load level content for step titles + ordering.
                let levelSteps: Array<{ slug: string; title: string }> = [];
                const contentModule = LEVEL_CONTENT[level];
                if (contentModule?.level?.steps) {
                    levelSteps = contentModule.level.steps.map((s) => ({
                        slug: s.slug,
                        title: s.title,
                    }));
                } else {
                    // Derive step list from DB rows as fallback
                    levelSteps = progressRows.map((r) => ({
                        slug: r.step_slug,
                        title: r.step_slug,
                    }));
                }

                const steps = levelSteps.map((s) => ({
                    slug: s.slug,
                    title: s.title,
                    completed: completedSlugs.has(s.slug),
                }));

                const completedCount = steps.filter((s) => s.completed).length;
                const recommendedNextStep = steps.find(
                    (s) => !s.completed,
                )?.slug;

                return Response.json({
                    level,
                    totalSteps: steps.length,
                    completedSteps: completedCount,
                    steps,
                    recommendedNextStep,
                });
            },
        },
    },
});
