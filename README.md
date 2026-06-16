# 🎭 AvatarClone

> **AI-powered digital avatar generation** — Upload your photo, clone your voice, and generate a personalized talking avatar video in seconds.

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
</p>

<p align="center">
  <!-- <a href="#">🌐 Live Demo</a> &nbsp;•&nbsp; -->
  <a href="https://github.com/HurrShahDev/AvatarClone-Backend">⚙️ Backend Repo</a>
</p>

---

## ✨ Overview

**AvatarClone** is a Final Year Project (FYP) that enables users to create AI-powered talking avatar videos from a single photo and a short voice sample. The system clones the user's voice, synthesizes speech, animates the face with accurate lip sync, and enhances the output video — all processed on cloud GPUs.

This repository contains the **frontend** of the application, built with React + TypeScript + Vite.

> 🔗 The backend (Python, Modal, Wav2Lip, GFPGAN, XTTS-v2) lives in a [separate repository](https://github.com/HurrShahDev/AvatarClone-Backend).

---

## 🎬 How It Works

```
1. User signs in via Firebase Auth
         │
         ▼
2. Upload a reference photo + record/upload voice sample
         │
         ▼
3. Frontend validates both inputs before sending
         │
         ▼
4. Request sent to Modal GPU backend
         │
         ┌─────────────────────────────────┐
         │  XTTS-v2  →  Voice cloning      │
         │  Wav2Lip  →  Lip sync           │
         │  GFPGAN   →  Face enhancement   │
         │  FFmpeg   →  Video encoding     │
         └─────────────────────────────────┘
         │
         ▼
5. Final video stored in Supabase & streamed to user
```

---

## ✅ Input Validation

AvatarClone validates both inputs **on the frontend** before any processing begins, ensuring high-quality avatar generation and reducing failed backend jobs.

### 🖼️ Image Validation

| Check | Details |
|---|---|
| **File Format** | Accepts `.jpg`, `.jpeg`, `.png` only |
| **File Size** | Maximum allowed size enforced before upload |
| **Face Detection** | Ensures exactly one face is present in the image |
| **Face Centering** | Face must be reasonably centered in the frame |
| **Brightness** | Image must meet minimum brightness threshold — too dark or overexposed images are rejected |

### 🎙️ Audio Validation

| Check | Details |
|---|---|
| **File Format** | Accepts `.mp3`, `.wav`, `.m4a` and common audio formats |
| **Duration** | Audio must fall within an acceptable duration range (too short or too long is rejected) |
| **Noise Level** | Audio is checked for excessive background noise — clean voice samples produce better cloning results |

> If any validation fails, the user receives a clear error message with guidance on how to fix the issue before retrying.

---

## 🖥️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Component library |
| Firebase Auth | User authentication |
| Supabase | Database & video storage |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- A running instance of the [AvatarClone Backend](https://github.com/HurrShahDev/AvatarClone-Backend)
- Firebase and Supabase project credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/HurrShahDev/AvatarClone.git
cd AvatarClone

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your credentials to .env

# Start the development server
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Backend
VITE_BACKEND_URL=your_backend_endpoint_url
```

---

## 📁 Project Structure

```
AvatarClone/
├── src/
│   ├── components/        # Reusable UI components (shadcn/ui)
│   ├── pages/             # Route-level page components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Firebase & Supabase client setup
│   └── types/             # TypeScript type definitions
├── public/
├── .env.example
├── package.json
└── vite.config.ts
```

---


## 🎓 About

Developed as a **Final Year Project (FYP)** at the **University of Central Punjab (UCP), Lahore**, in partial fulfillment of the requirements for the degree of **BS Computer Science**.

**Developer:** Hurr Shah — [@HurrShahDev](https://github.com/HurrShahDev)