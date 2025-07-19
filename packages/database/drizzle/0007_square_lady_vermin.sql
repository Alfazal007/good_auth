ALTER TABLE "normal_users" DROP CONSTRAINT "normal_users_email_unique";--> statement-breakpoint
ALTER TABLE "normal_users" ADD COLUMN "organization" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "normal_users" DROP COLUMN "isVerified";--> statement-breakpoint
ALTER TABLE "normal_users" DROP COLUMN "otp";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "isVerified";--> statement-breakpoint
ALTER TABLE "normal_users" ADD CONSTRAINT "normal_users_email_organization_unique" UNIQUE("email","organization");