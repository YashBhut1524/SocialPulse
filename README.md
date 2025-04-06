---

# Social Pulse 🌐

A modern, full-stack **social media application** built with the latest technologies including **Next.js 15**, **Clerk** for authentication, **PostgreSQL** for the database, and **Prisma** as the ORM. Experience real-time features, responsive UI, and seamless user experience.

### 🚀 Live Site
👉 [social-pulse-psi.vercel.app](https://social-pulse-psi.vercel.app/)

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15.2.4](https://nextjs.org/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), `tw-animate-css`, `clsx`
- **File Uploads**: [UploadThing](https://uploadthing.com/)
- **Toasts**: `react-hot-toast`
- **Themes**: `next-themes`

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/social-pulse.git
cd social-pulse
npm install
```

🔗 **Important:** Set up the **Clerk Webhook** to sync user data.  
📖 Refer to the official docs: [https://clerk.com/docs/webhooks/sync-data](https://clerk.com/docs/webhooks/sync-data)

---

## ⚙️ Environment Variables

Create a `.env` file and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

SIGNING_SECRET=your_signing_secret

DATABASE_URL=your_postgresql_connection_string

UPLOADTHING_TOKEN=your_uploadthing_token
```

---

## 🚧 Development

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
npm start
```

---

## 📸 Features

- 🔐 User Authentication (Clerk)
- 📄 User Profiles & Posts
- ❤️ Like & Follow system
- 📷 Image Uploads
- 💬 Responsive UI
- 🌗 Light/Dark Theme Support
- 🔥 Realtime UX with Radix + UploadThing

---

## 🧠 Learnings & Highlights

- Integrated **Clerk** for seamless user onboarding using webhooks.
- Implemented **server components** and used **RSC patterns** effectively with **Next.js 15**.
- Managed **type safety** and **data fetching** using **Prisma** and TypeScript.
- Deployed on **Vercel** for smooth CI/CD and preview deployments.

---