# Government Social Support Portal

A multi-step government social support portal with AI assistance, built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

Follow these simple steps to get the project running on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (optional, for AI features)

### 📦 Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/basitbc/social-support-portal.git
```

#### Step 2: Navigate to Project Directory

```bash
cd social-support-portal
```

#### Step 3: Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

#### Step 4: Environment Setup

Create a `.env` file in the root directory:

```bash
touch .env
```

Copy and paste the following environment variables into your `.env` file:

```env
VITE_OPENAI_API_KEY=<your-openai-api-key>
VITE_OPENAI_MODEL=gpt-3.5-turbo
VITE_OPENAI_MAX_TOKENS=200
VITE_OPENAI_TEMPERATURE=0.7
VITE_OPENAI_TIMEOUT=30000
```

**Note:** Replace `<your-openai-api-key>` with your actual OpenAI API key. If you don't have one, the app will still work but AI features will be disabled.

#### Step 5: Start Development Server

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will open at `http://localhost:5173`

## 🎯 One-Command Setup

Copy and paste this entire command block for quick setup:

```bash
# Clone and setup the project
git clone https://github.com/basitbc/social-support-portal.git && \
cd social-support-portal && \
npm install && \
echo "VITE_OPENAI_API_KEY=<your-openai-api-key>
VITE_OPENAI_MODEL=gpt-3.5-turbo
VITE_OPENAI_MAX_TOKENS=200
VITE_OPENAI_TEMPERATURE=0.7
VITE_OPENAI_TIMEOUT=30000" > .env && \
npm run dev
```

**Don't forget to replace `<your-openai-api-key>` with your actual API key in the `.env` file!**

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🌟 Features

- ✅ Multi-step wizard form (3 steps + review)
- ✅ AI-powered text suggestions
- ✅ Bilingual support (English/Arabic) with RTL
- ✅ Mobile-first responsive design
- ✅ Form validation and persistence
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Modern React architecture with Context API

## 🔧 Configuration

### OpenAI API Setup

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Update the `.env` file with your key:
   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### Language Configuration

The app supports English and Arabic by default. Language files are located in:
- `public/locales/en.json`
- `public/locales/ar.json`

## 📁 Project Structure

```
src/
├── components/          # Atomic Design Components
│   ├── atoms/          # Basic UI elements
│   ├── molecules/      # Simple combinations
│   ├── organisms/      # Complex UI sections
│   └── layouts/        # Page layouts
├── pages/              # Route components
├── context/            # State management
├── hooks/              # Custom hooks
├── services/           # API integrations
└── config/             # Configuration files
```

## 🚨 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Dependencies issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**OpenAI API not working:**
- Check your API key is valid
- Ensure you have credits in your OpenAI account
- Verify the `.env` file is in the root directory


**Happy coding! 🎉**