CREATE TABLE "projets" (
	"id" serial PRIMARY KEY NOT NULL,
	"titre" text NOT NULL,
	"lieu" text NOT NULL,
	"description" text NOT NULL,
	"categorie" text NOT NULL,
	"date" text NOT NULL,
	"photo_url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
