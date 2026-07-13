# 🩺 DoctorCode

> **Your AI-powered code doctor.** Paste buggy code, get instant diagnosis — bugs, security flaws, performance bottlenecks, and a fully optimized fix, all in seconds.

DoctorCode is a full-stack MERN application that uses **Google Gemini AI** to analyze code across 9 languages, identify issues with surgical precision, and return production-ready optimized code along with a structured, actionable report.

---

## ✨ Features

- 🔍 **Deep Code Analysis** — Detects bugs, security vulnerabilities, performance bottlenecks, and best-practice violations
- ⚡ **Instant Optimized Code** — Get a fully rewritten, corrected version of your code, not just a list of problems
- 📊 **Scoring System** — Quantified scores (0–100) across overall quality, security, performance, readability, and best practices
- 🎯 **Line-Level Precision** — Every issue includes severity rating, exact explanation, and a concrete fix
- 🔐 **Secure Authentication** — JWT-based auth with httpOnly cookies for session security
- 📚 **Review History** — Every analysis is saved to your personal dashboard for future reference
- 🌐 **Multi-Language Support** — JavaScript, TypeScript, Python, Java, C++, C#, Ruby, Go, PHP

---

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB with Mongoose  
**AI Engine:** Google Gemini API  
**Authentication:** JWT + httpOnly Cookies  
**Security:** bcrypt password hashing, input validation

---

## 🏗️ Architecture

Built with a clean **separation of concerns** — controllers handle HTTP, services handle business logic, and failed AI analyses are never persisted to keep the database clean.

---

## 📸 How It Works

1. User pastes their code and selects a language
2. DoctorCode sends the code to Gemini with a strict, structured prompt
3. Gemini returns a JSON report: bugs, security issues, performance flags, best-practice violations, and optimized code
4. The review is saved and instantly available in the user's history

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/doctorcode.git
cd doctorcode

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your MONGO_URI, JWT_SECRET, GEMINI_API_KEY, GEMINI_MODEL

# Run the server
npm run dev
```

---

## 🔮 Roadmap

- [ ] Real-time "processing" status via WebSockets
- [ ] Export review reports as PDF
- [ ] Support for reviewing entire repositories, not just snippets
- [ ] Team/organization dashboards

---

## 📄 License

MIT

---

**Built with ❤️ by [M.Zayan]** — a project born out of relentless self-study in the MERN stack.

⭐ If you found this project useful, consider giving it a star!
