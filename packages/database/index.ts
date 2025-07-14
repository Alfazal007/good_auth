import 'dotenv/config';
import * as databaseSchema from "./db/schema.ts"
import * as drizzleOrm from "drizzle-orm"

export {
    databaseSchema,
    drizzleOrm
}
