CREATE INDEX "idx_otp_email" ON "otp_codes" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_otp_expires_at" ON "otp_codes" USING btree ("expires_at");