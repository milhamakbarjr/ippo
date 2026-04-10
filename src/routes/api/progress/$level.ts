import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/progress/$level")({
    server: {
        handlers: {
            // TODO (Sprint 05): Read the `level` path param (e.g. "N5", "N4"),
            // query Neon Postgres (or localStorage for guests) for the user's
            // progress within that JLPT level, and return completed topics,
            // XP earned, and current streak data.
            GET: async () => {
                return Response.json(
                    { success: false, message: "Not implemented" },
                    { status: 501 },
                );
            },
        },
    },
});
