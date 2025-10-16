# 🛒 E-commerce Full-Stack Application

A comprehensive e-commerce platform with AI-powered product recommendations, featuring a modern React frontend, admin dashboard, Node.js backend, and machine learning service.

## 🚀 Live Demo

**Frontend Application**: [https://luxury-sherbet-2483b4.netlify.app/](https://luxury-sherbet-2483b4.netlify.app/)

## 📋 Project Overview

This repository contains a full-stack e-commerce application consisting of:
- 🎨 **Customer Frontend** - Modern React application with Tailwind CSS
- ⚙️ **Admin Dashboard** - Product and order management interface
- 🔧 **Backend API** - Node.js/Express server with MongoDB and Cloudinary
- 🤖 **ML Service** - Python FastAPI microservice for AI-powered recommendations

## 📁 Repository Structure

```
Ecommerce-final-ml/
├── admin/           # Admin dashboard (React + Vite + Tailwind)
├── Frontend/        # Customer app (React + Vite + Tailwind)
├── Backend/         # Express API (MongoDB, JWT, Cloudinary, Stripe/Razorpay)
└── ML_Model/        # FastAPI service for image embeddings (CLIP)
```

## 🛠️ Tech Stack

### Frontend & Admin
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization
- **Stripe/Razorpay** - Payment processing

### Database & ML
- **MongoDB** - NoSQL database
- **FastAPI** - Python web framework
- **Transformers (CLIP)** - AI model for image embeddings
- **PyTorch** - Machine learning framework
- **Pillow** - Image processing

## ⚙️ Prerequisites

- **Node.js 18+** and npm
- **Python 3.10+** (recommended) and pip
- **MongoDB** instance (local or hosted)
- **Cloudinary** account (for media storage)

## 🔧 Environment Setup

### Backend Environment Variables

Create a `.env` file in `Backend/` with the following variables:

```env
# Database
MongoDB_URL=mongodb://localhost:27017

# Authentication
JWT_SECRET=replace-with-a-long-random-secret

# Admin credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=supersecret

# Cloudinary (Required for image uploads)
Cloudinary_NAME=your_cloud_name
Cloudinary_API_Key=your_api_key
Cloudinary_API_SECRETE=your_api_secret

# Payment Gateways (Optional)
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

### ML Service Environment Variables

Create a `.env` file in `ML_Model/` with optional variables:

```env
HF_CLIP_MODEL=openai/clip-vit-base-patch32
MAX_BATCH_SIZE=8
REQUEST_TIMEOUT_SEC=30
LOG_LEVEL=INFO
```

> **Note**: The backend connects to the `ecomcerce` database. Admin authentication uses JWT tokens signed with the provided secret.

## 🚀 Installation & Setup

Run each service in its own terminal. Commands below assume Windows PowerShell/cmd, but are the same on macOS/Linux.

### 1️⃣ Backend (Express API)

```bash
cd Backend
npm install
# Ensure .env file is created with required variables
npm run server
```

- **Port**: 3000
- **Base URL**: `http://localhost:3000`
- **Key Routes**:
  - `GET /` – Health check
  - `*/api/user` – User management
  - `*/api/product` – Product operations
  - `*/api/cart` – Shopping cart
  - `*/api/order` – Order processing

### 2️⃣ Admin Dashboard (React + Vite)

```bash
cd admin
npm install
npm run dev
```

- **Port**: 5173 (auto-increments if busy)
- **Features**: Product management, order tracking, user administration

### 3️⃣ Frontend (Customer App)

```bash
cd Frontend
npm install
npm run dev
```

- **Port**: 5173/5174 (depending on availability)
- **Features**: Product browsing, shopping cart, checkout, user authentication

### 4️⃣ ML Service (FastAPI + CLIP)

```bash
cd ML_Model
python -m venv .venv
.\.venv\Scripts\activate    # Windows PowerShell
pip install --upgrade pip
pip install -r requirements.txt

# Start service
uvicorn ml_service:app --host 0.0.0.0 --port 8000 --reload
```

- **Port**: 8000
- **Base URL**: `http://localhost:8000`
- **Endpoints**:
  - `GET /health` → `{ ok: true, device: "cpu|cuda" }`
  - `POST /embed` → `{ image_url: string }` returns `{ embedding: number[] }`
  - `POST /embed_batch` → `{ image_urls: string[] }` returns `{ embeddings: number[][] }`

## Development Scripts

Each JavaScript package exposes common scripts:

- **Admin/Frontend**: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`
- **Backend**: `npm run server`

## Typical Local URLs

- Backend API: `http://localhost:3000`
- Admin UI: `http://localhost:5173` (or next free port)
- Frontend UI: `http://localhost:5173` or `http://localhost:5174`
- ML Service: `http://localhost:8000`

## Troubleshooting

- **Mongo connection fails**: verify `MongoDB_URL` and that MongoDB is running; the app connects to the `ecomcerce` database.
- **Cloudinary errors**: ensure all three variables (`Cloudinary_NAME`, `Cloudinary_API_Key`, `Cloudinary_API_SECRETE`) are present and correct.
- **Admin-only routes denied**: confirm the admin JWT is signed with `JWT_SECRET` and encodes `id = ADMIN_EMAIL + ADMIN_PASSWORD`.
- **Vite port in use**: Vite auto-selects the next free port; check the console for the actual URL.
- **ML service startup slow**: CLIP model downloads on first run; subsequent runs are faster. Set `HF_CLIP_MODEL` to a smaller model if needed.

## Notes

- The backend includes Stripe and Razorpay dependencies; ensure corresponding keys and routes are implemented/enabled if you plan to process payments.
- Tailwind is configured in both `admin/` and `Frontend/`.

## License

Proprietary – for educational/demo use unless a LICENSE file is added.


#
