CREATE TABLE "google" (
	"email" varchar(255) PRIMARY KEY NOT NULL,
	"profilePic" varchar(255),
	"name" varchar(255),
	CONSTRAINT "google_email_unique" UNIQUE("email")
);
