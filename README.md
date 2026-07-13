<div align="center">

# 🩺 DoctorCode AI

### AI-Powered Code Review Platform

Instant, intelligent code analysis that catches bugs, security vulnerabilities, and performance issues — before they ship.

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=flat&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📖 Overview

**DoctorCode AI** is a full-stack MERN application that acts as an always-available senior code reviewer. Paste any code snippet, and within seconds you get a structured, AI-generated breakdown covering **security, performance, readability, and best practices** — complete with severity-tagged issues, line-specific fixes, and a fully optimized rewrite of your code.

Unlike traditional linters that only catch syntax errors, DoctorCode AI understands *intent and context* — powered by Google's Gemini AI and a custom-built prompt engineering system spanning **14 programming languages and frameworks**.

Built to demonstrate real-world full-stack engineering: secure authentication, persistent history, clean state management, responsive UI, and thoughtful UX — not just a CRUD app.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔍 **AI Code Review** | Structured analysis across 5 dimensions: overall quality, security, performance, readability, best practices |
| 🐛 **Severity-Tagged Issues** | Every bug/vulnerability flagged as `critical`, `high`, `medium`, or `low` with exact line numbers |
| ✨ **Optimized Code Generation** | Side-by-side comparison — your original code vs. AI-rewritten, production-ready version |
| 📝 **Multi-Language Support** | Framework-aware reviews across 14 languages, dynamically injected into the AI prompt |
| 🕘 **Review History** | Every review persisted to MongoDB, tied to the authenticated user, browsable anytime |
| 🔐 **Secure Authentication** | JWT-based auth with HTTP-only cookies — no tokens exposed to client-side JS |
| 🎨 **Dark / Light Mode** | Full theme system using CSS variables, persisted across sessions |
| ⚡ **Live Code Editor** | Integrated Monaco Editor (the engine behind VS Code) with syntax highlighting & language selection |
| 📱 **Fully Responsive** | Mobile-first design across every page — dashboard, history, auth flows |

---

## 🛠️ Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Monaco Editor
- React Router
- Axios
  

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (HTTP-only cookie auth)
- Google Gemini API

**Architecture Highlights**
- RESTful API design with clean separation of controllers, services, and routes
- Custom prompt engineering layer (`FRAMEWORK_CONTEXT` map) for language-specific AI review accuracy
- Retry-backoff logic for handling AI service rate limits/overload
- Delete-on-fail pattern to prevent orphaned database records on failed AI reviews

---

## 🏗️ Project Structure

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/user/register` | Register a new user |
| `POST` | `/api/user/login` | Authenticate & set JWT cookie |
| `POST` | `/api/user/logout` | Clear auth cookie |
| `GET` | `/api/user/me` | Get current authenticated user |
| `POST` | `/api/reviews` | Submit code for AI review |
| `GET` | `/api/reviews` | Get all reviews for logged-in user |
| `GET` | `/api/reviews/:id` | Get a single review by ID |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Google Gemini API key

### Installation

```bash
git clone https://github.com/zayan975/DoctorCode.Ai.git
cd DoctorCode.Ai
```

**Backend setup**
```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

```bash
npm start
```

**Frontend setup**
```bash
cd ../doctercode.ai
npm install
npm run dev
```

The app will be running at `http://localhost:5173` (frontend) and `http://localhost:5000` (backend).

---

## 🎯 What This Project Demonstrates

- Designing and consuming a REST API from scratch (auth, CRUD, third-party AI integration)
- Secure, production-style authentication (HTTP-only cookies, not localStorage tokens)
- Prompt engineering for reliable, structured LLM output (JSON schema enforcement)
- Global state management without over-engineering (Context API for auth/theme)
- Debugging real production issues: CORS, JWT payload mismatches, API rate-limit handling, responsive layout bugs
- Clean Git workflow and project structure for a full-stack monorepo

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with ❤️ by [Stark](https://github.com/zayan975)

</div>
