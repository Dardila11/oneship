---
to: <%= name %>/src/app/layout.tsx
inject: true
---
<%
  const content = 'lang="en"';
  const pattern = '"en"';
  const replacement = '{locale}';

  // Call the async helper from .hygen.js
  h.replaceContent(content, pattern, replacement);
%>