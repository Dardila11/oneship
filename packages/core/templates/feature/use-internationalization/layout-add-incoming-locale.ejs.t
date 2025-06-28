---
to: <%= name %>/src/app/layout.tsx
inject: true
before: "return"
---
// Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }