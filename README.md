# 💍 The Wedding: Julian & Isabella

A premium, full-stack wedding application designed for elegance, security, and interactive storytelling. Features a high-end design, a secure admin dashboard, and responsive, tactile gallery experiences.

---

## ✨ Key Features

### 🎨 Design & Experience

- **Editorial Elegance**: A luxury-inspired UI with a custom color palette (Dusty Rose, Charcoal, and Sage) and premium typography.
- **Micro-Animations**: Smooth, professional transitions and interactions powered by **Framer Motion**.
- **Interactive "Moments" Gallery**:
  - **Auto-slide** for passive viewing.
  - **Drag-to-swipe** for manual navigation.
  - **Mouse Wheel / Trackpad** horizontal scroll support.

### 🔐 Administrative Security

- **Protected Dashboard**: A secure, password-only admin portal at `/admin` to manage guest privacy.
- **RESTful API Protection**: The server enforces validation, rejecting any unauthorized access.
- **Real-time Stats**: Track total guest counts, response status (attending/declined/maybe), and personal messages from friends.

### 📅 Event Details

- **Real-time Countdown**: A live ticker counting down to **Tuesday, April 14, 2026**.
- **Dynamic RSVP**: A fully functional response form with validation and instant feedback.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [Tailwind CSS 4](https://tailwindcss.com/), [TypeScript](https://www.typescriptlang.org/), [Framer Motion](https://www.framer.com/motion/).
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Prisma ORM](https://www.prisma.io/), [Zod](https://zod.dev/).
- **Database**: [PostgreSQL 17](https://www.postgresql.org/).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **PostgreSQL** (Running locally or via Docker)

### One-Command Setup

1. **Install All Dependencies**:

   ```bash
   npm run install:all
   ```

2. **Configure Environment Variables**:

   Create a `.env` file in the `server/` directory and populate it with your database and admin credentials:

   ```env
   DATABASE_URL="postgresql://[USER]:[PASSWORD]@localhost:5432/[DB_NAME]?schema=public"
   PORT=4000
   ADMIN_PASSWORD="#julianisabella#"
   ```

3. **Initialize Database**:

   ```bash
   npm run prisma:migrate
   npm run db:seed
   ```

4. **Launch Application**:

   ```bash
   npm run dev
   ```

   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin)
   - **Backend API**: [http://localhost:4000](http://localhost:4000)

---

## 📦 Project Structure

```text
├── client/          # Next.js Frontend Application
├── server/          # Express Backend & Prisma Configuration
├── database/        # Raw SQL schema for reference
└── stitch_admin_dashboard/  # Initial Prototypes & Design Reference
```

---

## 🔒 Security Information

> [!IMPORTANT]
> The admin portal is protected by a shared secret.
> - **Default Admin Password**: `#julianisabella#`
> - **Session Persistence**: Login persists in `sessionStorage` (active for the duration of the browser tab).

---

## Developed with ❤️ by Antigravity

A production-ready, autonomous implementation of luxury wedding experiences.
