# Ethereal Visions - AI Art Gallery & Marketing Platform

> Where AI Meets Artistry

A sophisticated React-based platform combining an AI-generated art gallery with powerful social media marketing tools. Experience unique artworks that blend the impossible geometries of Escher with the flowing elegance of Art Nouveau.

## ✨ Features

### 🎨 AI Art Gallery
- **Video Gallery**: Curated collection of AI-generated artistic videos
- **Interactive Search**: Find artwork by style, theme, or artist
- **Responsive Design**: Beautiful viewing experience across all devices
- **Commission System**: Request custom AI artwork

### 📱 Social Media Marketing Suite
- **AI Content Generation**: Powered by OpenAI for engaging social media posts
- **Post Scheduling**: Schedule content across multiple platforms
- **Analytics Dashboard**: Track engagement and optimize strategy
- **A/B Testing**: Compare content performance

### 🔐 Authentication & Access Control
- **JWT-based Authentication**: Secure user sessions
- **Role-based Access**: Admin, analyst, and viewer roles
- **Protected Routes**: Secure access to dashboard features

## 🚀 Quick Start

1. **Clone & Install**
```bash
git clone <repository-url>
cd bolt-generated-project
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. **Start Development**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📸 Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/3bad20a4-b33c-42a0-a414-ead68b9eaea5)

### Gallery
![Gallery](https://github.com/user-attachments/assets/1f02eb6c-bca7-43d6-9a6e-7dd1b3dc676a)

### Authentication
![Auth](https://github.com/user-attachments/assets/bca6bafa-79d3-4460-8afe-ef5fc818470c)

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Val.Town serverless functions
- **AI**: OpenAI API for content generation
- **Auth**: JWT with role-based access control
- **Icons**: Lucide React
- **Routing**: React Router v6

## 📚 Documentation

- [Setup Guide](SETUP.md) - Detailed installation and configuration
- [Environment Variables](.env.example) - Required API keys and configuration

## 🔧 Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🌐 Deployment

The application is designed for deployment with Val.Town backend services. See `scripts/deploy.ts` for automated deployment.

## 📄 License

MIT License - see LICENSE file for details.