#!/usr/bin/env node
// @ts-ignore: No type definitions for 'prompts'
import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"

const program = new Command()

// Create a new Oneship project
program
  .name("create-oneship-app")
  .description("Scaffold a new OneShip project")
  .version("0.1.0")
  .argument("[project-directory]", "Directory to create the new project in")
  .action(async (projectDirectory) => {
    // Get the project name
    let name = projectDirectory
    // If no name is provided, prompt the user for a name
    if (!name) {
      const response = await prompts({
        type: "text",
        name: "name",
        message: "What is your project named?",
        initial: "my-oneship-app",
      })
      name = response.name
    }

    // Prompt for options
    const options = await prompts([
      {
        type: "select",
        name: "language",
        message: "JavaScript or TypeScript?",
        choices: [
          { title: "TypeScript", value: "typescript" },
          { title: "JavaScript", value: "javascript" },
        ],
        initial: 0,
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Use TailwindCSS?",
        initial: true,
      },
      {
        type: "confirm",
        name: "shadcn",
        message: "Add Shadcn UI?",
        initial: false,
      },
      {
        type: "confirm",
        name: "auth",
        message: "Include Auth?",
        initial: false,
      },
      {
        type: "select",
        name: "authProvider",
        message: "Select auth provider:",
        choices: [
          { title: "Clerk", value: "clerk" },
          { title: "NextAuth.js", value: "next-auth" },
          { title: "Supabase Auth", value: "supabase" },
        ],
        initial: 0,
        skip: (prev: any, values: any) => !values.auth,
      },
    ])

    // Create project directory
    const projectDir = path.resolve(process.cwd(), name)
    await fs.ensureDir(projectDir)

    // Copy base template
    const templateDir = path.resolve(
      __dirname,
      "../../templates/base/oneship-starter-app"
    )
    await fs.copy(templateDir, projectDir, { overwrite: false })

    const { execa } = await import("execa")

    // Apply configuration options
    if (options.tailwind) {
      console.log("Adding Tailwind CSS...")
      await execa(
        "pnpm",
        ["add", "-D", "tailwindcss", "postcss", "autoprefixer"],
        { cwd: projectDir, stdio: "inherit" }
      )

      // Create tailwind.config.ts
      const tailwindConfig = `
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
`
      await fs.writeFile(
        path.join(projectDir, "tailwind.config.ts"),
        tailwindConfig
      )

      // Create postcss.config.js
      const postcssConfig = `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`
      await fs.writeFile(
        path.join(projectDir, "postcss.config.js"),
        postcssConfig
      )

      // Update globals.css
      const globalsCssPath = path.join(projectDir, "app", "globals.css")
      const globalsCssContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`
      await fs.writeFile(globalsCssPath, globalsCssContent)
    }

    if (options.shadcn) {
      console.log("Adding Shadcn UI...")
      await execa(
        "pnpm",
        [
          "add",
          "tailwindcss-animate",
          "class-variance-authority",
          "clsx",
          "lucide-react",
          "tailwind-merge",
        ],
        { cwd: projectDir, stdio: "inherit" }
      )

      // Create components.json
      const componentsJson = {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "default",
        rsc: true,
        tsx: true,
        tailwind: {
          config: "tailwind.config.ts",
          css: "app/globals.css",
          baseColor: "slate",
          cssVariables: true,
        },
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
        },
      }
      await fs.writeFile(
        path.join(projectDir, "components.json"),
        JSON.stringify(componentsJson, null, 2)
      )

      // Update tailwind.config.ts for Shadcn UI
      const tailwindConfigPath = path.join(projectDir, "tailwind.config.ts")
      const tailwindConfigContent = `
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
`
      await fs.writeFile(tailwindConfigPath, tailwindConfigContent)

      // Create lib/utils.ts
      const libDir = path.join(projectDir, "lib")
      await fs.ensureDir(libDir)
      const utilsContent = `
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`
      await fs.writeFile(path.join(libDir, "utils.ts"), utilsContent)

      // Update tsconfig.json for path aliases
      const tsconfigPath = path.join(projectDir, "tsconfig.json")
      const tsconfigJson = await fs.readJson(tsconfigPath)
      tsconfigJson.compilerOptions.baseUrl = "."
      tsconfigJson.compilerOptions.paths = {
        "@/*": ["./*"],
      }
      await fs.writeJson(tsconfigPath, tsconfigJson, { spaces: 2 })
    }

    if (options.auth && options.authProvider === 'next-auth') {
      console.log("Adding NextAuth.js...");
      await execa("pnpm", ["add", "next-auth"], { cwd: projectDir, stdio: "inherit" });

      // 1. Create lib/auth.ts
      const authTsContent = `import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);`;
      await fs.writeFile(path.join(projectDir, "lib", "auth.ts"), authTsContent);

      // 2. Create app/api/auth/[...nextauth]/route.ts
      const apiRouteDir = path.join(projectDir, "app", "api", "auth", "[...nextauth]");
      await fs.ensureDir(apiRouteDir);
      const apiRouteContent = `export { handlers as GET, handlers as POST } from "@/lib/auth";`;
      await fs.writeFile(path.join(apiRouteDir, "route.ts"), apiRouteContent);

      // 3. Create components/providers.tsx
      const componentsDir = path.join(projectDir, "components");
      await fs.ensureDir(componentsDir);
      const providersContent = `"use client";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}`;
      await fs.writeFile(path.join(componentsDir, "providers.tsx"), providersContent);

      // 4. Update app/layout.tsx
      const layoutPath = path.join(projectDir, "app", "layout.tsx");
      let layoutContent = await fs.readFile(layoutPath, "utf-8");
      
      if (!layoutContent.includes('import { Providers }')) {
        layoutContent = layoutContent.replace(
          'import type { ReactNode } from \\'react\\';',
          'import type { ReactNode } from \\'react\\';\nimport { Providers } from "@/components/providers";'
        );
        layoutContent = layoutContent.replace(
          '<body>{children}</body>',
          '<body><Providers>{children}</Providers></body>'
        );
        await fs.writeFile(layoutPath, layoutContent);
      }
      
      // 5. Create or update .env file with NEXTAUTH_SECRET
      const envPath = path.join(projectDir, ".env");
      const envContentToAdd = `
# NextAuth.js
NEXTAUTH_SECRET="your-super-secret-key-here" # Replace with output from: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_ID=""
GITHUB_SECRET=""
`;
      
      let existingEnvContent = "";
      if (await fs.pathExists(envPath)) {
        existingEnvContent = await fs.readFile(envPath, "utf-8");
      }

      await fs.writeFile(envPath, existingEnvContent + envContentToAdd);
    }

    // Install dependencies
    console.log("Installing dependencies...")
    await execa("pnpm", ["install"], { cwd: projectDir, stdio: "inherit" })

    console.log(`\nSuccess! Created ${name} at ${projectDir}\n`)
    console.log("Next steps:")
    console.log(`  cd ${name}`)
    console.log("  pnpm dev")
  })

program.parse(process.argv)
