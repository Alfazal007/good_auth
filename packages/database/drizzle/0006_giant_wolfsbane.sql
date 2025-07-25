CREATE TABLE "normal_users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "normal_users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"isVerified" boolean DEFAULT false,
	"otp" varchar(6) DEFAULT '0000',
	CONSTRAINT "normal_users_email_unique" UNIQUE("email")
);
