# CurateBang

A minimalist AI-driven content amplification platform that transforms a single idea into high-quality, tailored content for multiple social media platforms.

## Features

- **Multi-Platform Content Generation**: Create optimized content for Twitter, LinkedIn, Facebook, and Instagram simultaneously
- **AI-Powered Content Creation**: Leverages Perplexity AI for intelligent, contextual content generation
- **Real-time Processing**: Generate content in seconds with live feedback
- **Professional UI**: Clean, minimalist interface built with modern design principles
- **Secure Authentication**: User management with Convex Auth
- **Generation History**: Track and manage your content creation history

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Convex (real-time database and serverless functions)
- **AI Integration**: Perplexity API
- **Authentication**: Convex Auth
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Perplexity API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd curate-bang
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your Perplexity API key to `.env.local`:

```
PERPLEXITY_API_KEY=your_api_key_here
```

4. Initialize Convex:

```bash
npx convex dev
```

5. Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
curate-bang/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main application dashboard
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── ...               # Feature-specific components
├── convex/               # Backend functions and schema
│   ├── schema.ts         # Database schema
│   ├── actions.ts        # AI integration actions
│   └── ...              # Other backend functions
└── .kiro/               # Project specifications and design docs
```

## API Integration

The application integrates with Perplexity AI to generate platform-specific content. Each platform has optimized prompts and formatting:

- **Twitter**: Character-limited, hashtag-optimized content
- **LinkedIn**: Professional, engagement-focused posts
- **Facebook**: Community-oriented, shareable content
- **Instagram**: Visual-first, story-driven captions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npx convex dev` - Start Convex development environment

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.
