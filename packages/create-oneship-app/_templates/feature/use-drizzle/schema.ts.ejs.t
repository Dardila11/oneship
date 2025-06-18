---
to: <%= name %>/drizzle/schema.ts
---
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const exampleTable = pgTable("example", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
}); 