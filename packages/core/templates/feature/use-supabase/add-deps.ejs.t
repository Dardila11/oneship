---
to: <%= name %>/package.json
inject: true
after: '"dependencies": {'
---
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "@supabase/supabase-js": "^2.44.4", 