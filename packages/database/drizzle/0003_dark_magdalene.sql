ALTER TABLE "users" ALTER COLUMN "otp" SET DATA TYPE varchar(6);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "otp" SET DEFAULT '0000';