import { createFileRoute } from "@tanstack/react-router";

// TODO: uncomment after Sprint 1 DB layer (src/db/validators.ts is created)
// import { ProgressUpdateSchema } from "@/db/validators";

export const Route = createFileRoute("/api/progress/complete")({
    server: {
        handlers: {
            // TODO (Sprint 05): Parse request body with ProgressUpdateSchema,
            // mark the given lesson/topic as complete, award XP, update streak,
            // and persist progress to Neon Postgres for registered users or
            // localStorage for guests.
            POST: async () => {
                return Response.json(
                    { success: false, message: "Not implemented" },
                    { status: 501 },
                );
            },
        },
    },
});
