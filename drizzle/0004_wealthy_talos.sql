CREATE TABLE "game_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"game_type" varchar(50) NOT NULL,
	"level" varchar(10) NOT NULL,
	"score" integer NOT NULL,
	"max_score" integer NOT NULL,
	"time_seconds" integer,
	"completed_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "quiz_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"question_id" varchar(100) NOT NULL,
	"question_text" text NOT NULL,
	"options" jsonb NOT NULL,
	"explanation" text NOT NULL,
	"category" varchar(20) NOT NULL,
	"level" varchar(10) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "quiz_bank_question_id_unique" UNIQUE("question_id")
);
--> statement-breakpoint
CREATE TABLE "quiz_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"submitted_by" uuid NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"level" varchar(10) NOT NULL,
	"category" varchar(20) NOT NULL,
	"questions" jsonb NOT NULL,
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"reviewer_id" uuid,
	"review_note" text,
	"submitted_at" timestamp,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar(20) DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "game_results" ADD CONSTRAINT "game_results_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_submissions" ADD CONSTRAINT "quiz_submissions_submitted_by_users_id_fk" FOREIGN KEY ("submitted_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_submissions" ADD CONSTRAINT "quiz_submissions_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_game_results_user" ON "game_results" USING btree ("user_id","completed_at");--> statement-breakpoint
CREATE INDEX "idx_quiz_bank_slug" ON "quiz_bank" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_quiz_bank_level_cat" ON "quiz_bank" USING btree ("level","category");--> statement-breakpoint
CREATE INDEX "idx_submissions_status" ON "quiz_submissions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_submissions_user" ON "quiz_submissions" USING btree ("submitted_by");