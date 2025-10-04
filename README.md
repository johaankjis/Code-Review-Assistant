# AI Code Review Assistant

A GenAI-powered code review tool for developers that provides comprehensive, intelligent code analysis with multiple review types including security, performance, style, and comprehensive reviews.

## 🚀 Features

### Multi-Type Code Reviews
- **Comprehensive Review**: Full code analysis covering quality, bugs, performance, security, maintainability, and readability
- **Security Analysis**: Deep dive into security vulnerabilities including SQL injection, XSS, authentication issues, and data exposure risks
- **Performance Review**: Optimization opportunities focusing on time complexity, memory usage, and algorithmic efficiency
- **Style Guide**: Code style and best practices analysis including naming conventions, organization, and documentation

### Language Support
Supports multiple programming languages:
- JavaScript / TypeScript
- Python
- Java
- C++
- Go
- Rust
- PHP
- Ruby
- Swift

### Review Management
- **Review History**: Store and access up to 50 recent code reviews in local storage
- **Analytics Dashboard**: Track review statistics including:
  - Total reviews conducted
  - Languages analyzed
  - Review types distribution
  - Most used review types and languages

### User Experience
- **Dark Mode**: Built-in dark theme for comfortable extended use
- **Real-time Analysis**: Powered by GPT-4o-mini for fast, accurate reviews
- **Responsive Design**: Optimized for desktop and mobile devices
- **Interactive UI**: Built with modern React components and shadcn/ui

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9 with custom design system
- **UI Components**: 
  - Radix UI primitives for accessibility
  - shadcn/ui components
  - Lucide React icons
  
### Backend
- **Runtime**: Next.js API Routes
- **AI Integration**: Vercel AI SDK with OpenAI GPT-4o-mini
- **Storage**: Browser localStorage for review history

### Additional Libraries
- **Font**: Geist Sans and Geist Mono
- **Analytics**: Vercel Analytics
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Tailwind Animate CSS

## 📦 Installation

### Prerequisites
- Node.js 18+ or later
- npm or pnpm package manager
- OpenAI API key (configured through Vercel AI SDK)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Code-Review-Assistant.git
   cd Code-Review-Assistant
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Add your OpenAI API key or Vercel AI SDK configuration
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Submitting Code for Review

1. **Navigate to the Review Tab**: The default landing page
2. **Select Programming Language**: Choose from the dropdown menu
3. **Choose Review Type**: Select the type of analysis you need:
   - Comprehensive (default)
   - Security
   - Performance
   - Style
4. **Paste Your Code**: Enter code in the editor (supports multi-line)
5. **Click "Review Code"**: Wait for AI analysis
6. **Review Results**: Read the detailed feedback and recommendations

### Viewing History

1. **Click the History Tab**: Access your previous reviews
2. **Browse Reviews**: Scroll through past submissions
3. **Select a Review**: Click to view full details
4. **Delete Reviews**: Remove individual items or clear all history

### Analytics

1. **Click the Analytics Tab**: View your review statistics
2. **Track Metrics**:
   - Total number of reviews
   - Number of languages analyzed
   - Most frequently used languages
   - Review type distribution

## 📁 Project Structure

```
Code-Review-Assistant/
├── app/                        # Next.js app directory
│   ├── api/
│   │   └── review/
│   │       └── route.ts       # API endpoint for code review
│   ├── globals.css            # Global styles and theme
│   ├── layout.tsx             # Root layout with metadata
│   └── page.tsx               # Main homepage component
├── components/                 # React components
│   ├── ui/                    # shadcn/ui base components
│   ├── code-editor.tsx        # Code input component
│   ├── review-analytics.tsx   # Analytics dashboard
│   ├── review-display.tsx     # Review results display
│   ├── review-history.tsx     # History management
│   ├── review-type-selector.tsx # Review type selector
│   └── theme-provider.tsx     # Theme context
├── hooks/                      # Custom React hooks
│   ├── use-mobile.ts          # Mobile breakpoint hook
│   └── use-toast.ts           # Toast notification hook
├── lib/                        # Utility libraries
│   ├── review-storage.ts      # LocalStorage management
│   └── utils.ts               # Helper functions
├── public/                     # Static assets
├── styles/                     # Additional styles
├── components.json            # shadcn/ui configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🔧 Configuration

### Next.js Configuration
The project uses Next.js 15 with the following settings:
- ESLint and TypeScript errors ignored during builds
- Unoptimized images for better performance
- Edge runtime support (60-second max duration for API routes)

### Tailwind Configuration
Custom design system with:
- OKLCH color space for better color accuracy
- Custom CSS variables for theming
- Dark mode support
- Responsive breakpoints
- Custom animations

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured (`@/*`)
- ESNext module system
- Next.js plugin integration

## 🤖 AI Review Prompts

The application uses specialized prompts for each review type:

### Comprehensive Review
Analyzes:
1. Code Quality & Best Practices
2. Potential Bugs & Issues
3. Performance Optimization Opportunities
4. Security Concerns
5. Maintainability & Readability
6. Specific Recommendations

### Security Review
Focuses on:
- SQL injection risks
- XSS vulnerabilities
- Authentication/authorization issues
- Data exposure risks
- Input validation problems

### Performance Review
Examines:
- Time complexity issues
- Memory usage problems
- Inefficient algorithms
- Database query optimization
- Caching opportunities

### Style Review
Checks:
- Naming conventions
- Code organization
- Documentation quality
- Consistency with best practices
- Readability improvements

## 📊 Data Storage

### Review History
- **Storage**: Browser localStorage
- **Capacity**: Up to 50 recent reviews
- **Data Structure**: 
  ```typescript
  interface ReviewHistoryItem {
    id: string
    code: string
    language: string
    reviewType: string
    review: string
    timestamp: string
  }
  ```

### Analytics
Real-time statistics calculated from review history:
- Total review count
- Language usage distribution
- Review type distribution
- Recent reviews (last 5)

## 🚢 Deployment

### Vercel (Recommended)
This project is optimized for deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment Variables**: Add your API keys
3. **Deploy**: Automatic deployments on push

```bash
# Using Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms
Can be deployed to any platform supporting Next.js:
- AWS Amplify
- Netlify
- Railway
- Render

Build command:
```bash
npm run build
```

Start command:
```bash
npm run start
```

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

### Adding New Components

This project uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add [component-name]
```

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add TypeScript types for all props and state

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created as a demonstration of AI-powered code review capabilities. Check the repository for license information.

## 🔗 Links

- **Repository**: [https://github.com/johaankjis/Code-Review-Assistant](https://github.com/johaankjis/Code-Review-Assistant)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Vercel AI SDK**: [https://sdk.vercel.ai/docs](https://sdk.vercel.ai/docs)
- **shadcn/ui**: [https://ui.shadcn.com](https://ui.shadcn.com)

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.dev) - Vercel's AI-powered development platform
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)
- Fonts from [Geist](https://vercel.com/font)
- AI powered by [OpenAI GPT-4o-mini](https://openai.com)

## 📧 Support

For questions, issues, or suggestions, please open an issue on the GitHub repository.

---

**Made with ❤️ using Next.js, TypeScript, and AI**
