export interface FeatureOptions {
  tailwind: boolean
  drizzle: boolean
  shadcn: boolean
  authProvider:
    | "clerk"
    | "next-auth"
    | "supabase-auth"
    | "lucia"
    | "better-auth"
    | "none"
  orm: "drizzle" | "prisma" | "none"
  db: "postgres" | "mysql" | "sqlite" | "none"
  internationalization: boolean
}
