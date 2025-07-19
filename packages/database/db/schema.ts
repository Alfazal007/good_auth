import { integer, pgTable, varchar, unique } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    otp: varchar({ length: 6 }).default("0000")
});

export const normalTable = pgTable("normal_users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull(),
    organization: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
}, (table) => [
    unique().on(table.email, table.organization),
]);

