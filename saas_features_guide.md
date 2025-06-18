# Core Features Every SaaS App Should Have

To make **OneShip** truly useful for building and shipping SaaS apps, it should streamline integration of **essential features that nearly every SaaS app needs**. Here's a breakdown of **core features all SaaS applications typically require**, grouped by category:

---

### 🔐 Authentication & Authorization

- **User registration & login**
- **OAuth integration** (Google, GitHub, etc.)
- **Password reset / magic link**
- **Role-based access control (RBAC)**
- **Multi-tenancy support** (optional but useful for B2B SaaS)

---

### 🧾 Billing & Subscription

- **Stripe integration** (subscriptions, one-time payments)
- **Pricing plans (tiers)**
- **Trial period support**
- **Billing history / invoice access**
- **Usage-based billing support** (optional, but becoming more common)

---

### 🛠️ Admin & User Management

- **User profile management**
- **Admin dashboard**
- **Invite / team management**
- **Audit logs / activity tracking**

---

### ✉️ Notifications & Communication

- **Transactional emails** (welcome, password reset, billing notices)
- **In-app notifications**
- **Email integration (SendGrid, Resend, etc.)**

---

### ⚙️ App Infrastructure & Dev Tools

- **Environment variable management**
- **Database support** (PostgreSQL, MySQL, MongoDB)
- **ORM integration** (Drizzle, Prisma, etc.)
- **API routes / REST or GraphQL setup**
- **Rate limiting / throttling**

---

### 📈 Analytics & Monitoring

- **Basic app metrics (signups, usage)**
- **Error logging (Sentry, etc.)**
- **Performance monitoring**

---

### 🧹 Optional but Powerful

- **Feature flags**
- **Custom domains**
- **Localization / i18n**
- **Integrations hub** (Zapier, Slack, etc.)
- **Dark mode / theming**

---

### 🌟 Recommendation for OneShip

Each of these should be available via a CLI command like:

```bash
oneship add auth --using=clerk
oneship add billing --using=stripe
oneship add analytics --using=posthog
oneship add notifications --using=resend
oneship add feature team-management
```

This structure ensures that SaaS developers can build feature-complete apps with minimal setup and maximum flexibility.

