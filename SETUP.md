# Ethereal Visions - Setup Guide

## Overview
Ethereal Visions is an AI Art Gallery application with integrated social media marketing capabilities, built with React, TypeScript, and Vite.

## Prerequisites
- Node.js 18+ 
- npm or yarn
- Val.Town account (for backend services)
- OpenAI API key (for AI content generation)

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Val.Town API Configuration
VITE_VAL_TOWN_API_KEY=your_val_town_api_key_here

# OpenAI API Configuration  
VITE_OPENAI_API_KEY=your_openai_api_key_here

# JWT Secret for authentication
JWT_SECRET=your-secret-key-here
```

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd bolt-generated-project
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your actual API keys
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Features

### Core Application
- **AI Art Gallery**: Browse AI-generated artwork and videos
- **User Authentication**: JWT-based auth with role-based access control
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Commission System**: Request custom AI artwork

### Admin Dashboard (Authentication Required)
- **AI Marketing Dashboard**: Content generation and strategy optimization
- **Social Media Dashboard**: Post scheduling and analytics
- **Analytics**: Conversation tracking and reporting

## Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for bundling and development
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation

### Backend Services
- **Val.Town** for serverless backend functions
- **OpenAI API** for AI content generation
- **JWT** for authentication

### Key Services
- `authService.ts` - User authentication and authorization
- `socialMediaService.ts` - Social media integration
- `aiContentGenerator.ts` - AI content generation
- `valtown.service.ts` - Val.Town API integration

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Deployment

The application is designed to work with Val.Town for backend services. See `scripts/deploy.ts` for deployment automation.

## Contributing

1. Ensure all lint errors are fixed before committing
2. Test authentication flows thoroughly
3. Verify all API integrations work with proper environment variables
4. Maintain responsive design across all components