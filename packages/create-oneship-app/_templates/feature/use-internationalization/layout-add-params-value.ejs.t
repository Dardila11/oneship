---
to: <%= name %>/src/app/layout.tsx
inject: true
after: "children: React.ReactNode;"
---
params: Promise<{locale: string}>;