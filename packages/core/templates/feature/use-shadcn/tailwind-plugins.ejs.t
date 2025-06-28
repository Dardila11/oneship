---
to: <%= name %>/tailwind.config.ts
inject: true
replace: "plugins: [],"
---
  plugins: [require("tailwindcss-animate")], 