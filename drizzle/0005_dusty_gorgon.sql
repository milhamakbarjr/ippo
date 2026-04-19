CREATE TABLE "quiz_sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"level" varchar(10) NOT NULL,
	"set_type" varchar(20) DEFAULT 'category' NOT NULL,
	"categories" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"author_id" uuid,
	"submission_id" uuid,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "quiz_sets_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "quiz_bank" ADD COLUMN "quiz_set_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "onboarding_completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz_sets" ADD CONSTRAINT "quiz_sets_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_sets" ADD CONSTRAINT "quiz_sets_submission_id_quiz_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."quiz_submissions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_quiz_sets_level" ON "quiz_sets" USING btree ("level");--> statement-breakpoint
CREATE INDEX "idx_quiz_sets_level_type" ON "quiz_sets" USING btree ("level","set_type");--> statement-breakpoint
ALTER TABLE "quiz_bank" ADD CONSTRAINT "quiz_bank_quiz_set_id_quiz_sets_id_fk" FOREIGN KEY ("quiz_set_id") REFERENCES "public"."quiz_sets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_quiz_bank_quiz_set" ON "quiz_bank" USING btree ("quiz_set_id");