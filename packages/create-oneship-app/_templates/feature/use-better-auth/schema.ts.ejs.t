---
to: <%= name %>/drizzle/schema.ts
db: "<%= db %>"
---
<% if (db === 'postgres') { %>
import { pgTable, serial, text, varchar, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).unique(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 256 }),
  provider: varchar("provider", { length: 256 }),
  providerAccountId: varchar("provider_account_id", { length: 256 }),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: timestamp("expires_at"),
  tokenType: varchar("token_type", { length: 256 }),
  scope: varchar("scope", { length: 256 }),
  idToken: text("id_token"),
  sessionState: varchar("session_state", { length: 256 }),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionToken: varchar("session_token", { length: 256 }).unique(),
  expires: timestamp("expires"),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier", { length: 256 }),
  token: varchar("token", { length: 256 }),
  expires: timestamp("expires"),
}, (vt) => ({
  pk: primaryKey(vt.identifier, vt.token),
}));
<% } else if (db === 'mysql') { %>
import { mysqlTable, int, text, varchar, timestamp, primaryKey } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).unique(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const accounts = mysqlTable("accounts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 256 }),
  provider: varchar("provider", { length: 256 }),
  providerAccountId: varchar("provider_account_id", { length: 256 }),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: timestamp("expires_at"),
  tokenType: varchar("token_type", { length: 256 }),
  scope: varchar("scope", { length: 256 }),
  idToken: text("id_token"),
  sessionState: varchar("session_state", { length: 256 }),
});

export const sessions = mysqlTable("sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionToken: varchar("session_token", { length: 256 }).unique(),
  expires: timestamp("expires"),
});

export const verificationTokens = mysqlTable("verification_tokens", {
  identifier: varchar("identifier", { length: 256 }),
  token: varchar("token", { length: 256 }),
  expires: timestamp("expires"),
}, (vt) => ({
  pk: primaryKey(vt.identifier, vt.token),
}));
<% } %> 