# 🏡 Real Estate AI Assistant

An AI-powered SMS lead responder for real estate agents. Automatically follows up with leads using OpenAI + Twilio, logs all interactions with Prisma/PostgreSQL (via Supabase), and includes a basic admin dashboard for tracking activity.

---

## 🚀 Features

- ✍️ Lead capture form (name, phone, property)
- 🤖 GPT-powered response logic (optional, mocked for now)
- 📲 SMS integration via Twilio (A2P 10DLC-ready)
- 🧾 Admin dashboard to view leads + status
- 🗃️ Prisma ORM with Supabase as the backend
- 🔐 Typed API routes (Next.js App Router)

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router, TypeScript)
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Prisma
- **Messaging**: Twilio (SMS)
- **AI**: OpenAI (optional GPT integration)
- **Deployment**: Vercel (suggested)

---

## 🧑‍💻 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/AnnaMhairi/Real-Estate-AI.git
cd Real-Estate-AI
npm install
