import { createFileRoute } from "@tanstack/react-router";

// TODO: uncomment after Sprint 1 DB layer (src/db/validators.ts is created)
// import { AssessmentSubmitSchema } from "@/db/validators";

export const Route = createFileRoute("/api/assessment/submit")({
    server: {
        handlers: {
            // TODO (Sprint 03): Parse request body with AssessmentSubmitSchema,
            // run scoring logic against the 5-question JLPT level assessment,
            // persist the result to Neon Postgres for registered users or
            // localStorage for guests, and return the resolved JLPT level.
            POST: async () => {
                return Response.json(
                    { success: false, message: "Not implemented" },
                    { status: 501 },
                );
            },
        },
    },
});
