🌟 AI-Powered E-Commerce Platform
A cutting-edge full-stack e-commerce solution featuring intelligent product search, seamless user experience, and advanced machine learning capabilities for enhanced customer engagement.

🌐 Live Deployment
Production Application: https://luxury-sherbet-2483b4.netlify.app/

🎯 Project Architecture
This comprehensive e-commerce platform consists of four interconnected microservices:

🛍️ Customer Portal - Responsive React storefront with modern UX/UI

📊 Management Console - Administrative control panel for business operations

🚀 API Gateway - Robust Express.js backend with advanced integrations

🧠 Intelligence Layer - FastAPI-powered ML service with CLIP embeddings

📂 Codebase Organization
text
Ecommerce-final-ml/
├── Frontend/        # Customer-facing React application
├── admin/           # Business management dashboard
├── Backend/         # Core API server with MongoDB integration
└── ML_Model/        # AI/ML microservice for image recognition
💻 Technology Framework
Client-Side Applications
React 18 with modern hooks and context API

Vite 6 for lightning-fast development and builds

Tailwind CSS for responsive, utility-first styling

React Router DOM for seamless navigation

Axios for efficient HTTP communication

Server Infrastructure
Node.js runtime environment

Express.js web application framework

MongoDB & Mongoose for flexible data persistence

JSON Web Tokens (JWT) for secure authentication

Multer middleware for file upload handling

Cloudinary SDK for cloud-based media management

Payment Integration via Stripe and Razorpay APIs

AI/ML Technology Stack
FastAPI framework for high-performance API development

OpenAI CLIP model for advanced image understanding

PyTorch deep learning framework

Transformers library for state-of-the-art NLP models

Pillow (PIL) for comprehensive image processing

🔋 System Requirements
Node.js version 18 or higher with npm package manager

Python 3.10+ with pip installer

MongoDB database (local installation or cloud service)

Cloudinary account with API credentials

🔐 Configuration Management
API Server Configuration
Create Backend/.env with these essential variables:

```bash
# Database Connection
MongoDB_URL=mongodb://localhost:27017

# Security Configuration
JWT_SECRET=your-ultra-secure-random-key-here

# Administrative Access
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD=your-strong-admin-password

# Cloud Storage Service
Cloudinary_NAME=your-cloudinary-cloud-name
Cloudinary_API_Key=your-cloudinary-api-key
Cloudinary_API_SECRETE=your-cloudinary-api-secret

# Payment Gateway Integration
STRIPE_SECRET_KEY=sk_test_your_stripe_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

ML Service Configuration
Create ML_Model/.env for AI service customization:

```bash
HF_CLIP_MODEL=openai/clip-vit-base-patch32
MAX_BATCH_SIZE=8
REQUEST_TIMEOUT_SEC=30
LOG_LEVEL=INFO
```

🚀 Development Workflow
Step 1: Launch Core API Services

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Start development server with hot-reload
npm run server
```

Service Details:

Port: 3000

Endpoint: http://localhost:3000

API Documentation: Available at /api/docs

Step 2: Initialize Management Dashboard

```bash
# Switch to admin directory
cd admin

# Install required packages
npm install

# Launch development environment
npm run dev
```

Dashboard Access: http://localhost:5173 (or next available port)

Step 3: Start Customer Application

```bash
# Navigate to frontend
cd Frontend

# Install dependencies
npm install

# Begin development server
npm run dev
```

Application URL: http://localhost:5174 (auto-assigned port)

Step 4: Deploy ML Intelligence Service

```bash
# Enter ML service directory
cd ML_Model

# Create isolated Python environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Upgrade pip and install requirements
pip install --upgrade pip
pip install -r requirements.txt

# Launch FastAPI service
uvicorn ml_service:app --host 0.0.0.0 --port 8000 --reload
```

ML Service Details:

Port: 8000

Base URL: http://localhost:8000

Interactive Docs: http://localhost:8000/docs

🔌 API Endpoints Overview
Core Business Logic
- Health Check: GET /
- User Management: POST /api/user/register, POST /api/user/login
- Product Catalog: GET /api/product/list, POST /api/product/add
- Shopping Cart: POST /api/cart/add, GET /api/cart/get
- Order Processing: POST /api/order/place, GET /api/order/userorder

AI-Powered Features
- System Health: GET /health
- Image Embedding: POST /embed with { image_url: string }
- Batch Processing: POST /embed_batch with { image_urls: string[] }

🛠️ Development Commands
JavaScript Applications
- Development: npm run dev
- Production Build: npm run build
- Build Preview: npm run preview
- Code Quality: npm run lint

Backend Service
- Development Mode: npm run server (with nodemon auto-restart)

🌍 Service Endpoints
Service	Development URL	Description
- API Server	http://localhost:3000	Core business logic and data
- Admin Panel	http://localhost:5173	Management interface
- Customer App	http://localhost:5174	Shopping experience
- ML Service	http://localhost:8000	AI-powered recommendations

🔧 Common Issues & Solutions
Database Connection Issues
- Verify MongoDB_URL configuration and ensure MongoDB service is active
- Check that the database name ecomcerce is accessible

Media Upload Failures
- Confirm all Cloudinary environment variables are properly configured
- Validate API credentials in your Cloudinary dashboard

Authentication Errors
- Ensure JWT_SECRET is consistent across all services
- Verify admin credentials match the configured values

Port Conflicts
- Vite automatically selects alternative ports when conflicts occur
- Check terminal output for actual assigned URLs

ML Service Performance
- Initial CLIP model download may take several minutes
- Consider using smaller models for development: openai/clip-vit-small-patch32

📝 Additional Notes
This platform integrates modern payment processing through Stripe and Razorpay. The ML service provides intelligent product recommendations using state-of-the-art computer vision models. All frontend applications utilize Tailwind CSS for consistent, responsive design across devices.

📄 License
This project is proprietary and intended for educational and demonstration purposes.
