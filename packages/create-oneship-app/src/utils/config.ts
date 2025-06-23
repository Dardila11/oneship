import { FeatureOptions } from "../prompts"

export function validateAndNormalizeOptions(
  options: Partial<FeatureOptions>
): FeatureOptions {
  const normalizedOptions: Partial<FeatureOptions> = { ...options }

  // Shadcn UI depends on Tailwind CSS.
  if (normalizedOptions.shadcn && !normalizedOptions.tailwind) {
    console.warn(
      "Shadcn UI requires Tailwind CSS. Enabling Tailwind CSS automatically."
    )
    normalizedOptions.tailwind = true
    normalizedOptions.shadcn = true
  }

  return {
    tailwind: normalizedOptions.tailwind ?? false,
    drizzle: normalizedOptions.drizzle ?? false,
    shadcn: normalizedOptions.shadcn ?? false,
    authProvider: normalizedOptions.authProvider ?? "none",
    orm: normalizedOptions.orm ?? "drizzle",
    db: normalizedOptions.db ?? "postgres",
    internationalization: normalizedOptions.internationalization ?? false,
  }
}
