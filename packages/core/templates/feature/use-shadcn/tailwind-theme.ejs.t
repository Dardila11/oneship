---
to: <%= name %>/tailwind.config.ts
inject: true
after: "extend: {"
---
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      }, 