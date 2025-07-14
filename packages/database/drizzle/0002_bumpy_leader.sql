ALTER TABLE "users" ADD COLUMN "isVerified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "otp" varchar(4) DEFAULT '0000';