# AI News Aggregator 🤖📰

Transform your news reading experience with AI-powered insights and analysis.

## Quick Start 🚀

## Features ✨

### Smart Analysis 🧠
- **Sentiment Analysis**: Understand the emotional tone of articles
- **Opinion Detection**: Distinguish between news and opinion pieces
- **Key Phrase Extraction**: Quickly grasp main topics
- **Readability Scoring**: Know the complexity level at a glance

### Modern Experience 💫
- **Real-time Updates**: Stay current with latest news
- **Category Filtering**: Focus on topics you care about
- **Smart Search**: Find exactly what you're looking for
- **Dark Mode**: Easy on the eyes, day or night

### AI-Powered Insights 🔍
- **Topic Clustering**: See related stories together
- **Bias Detection**: Stay informed about potential biases
- **Summary Generation**: Quick article overviews
- **Trend Analysis**: Spot emerging stories

### User-Friendly Design 🎨
- **Responsive Layout**: Perfect on any device
- **Clean Interface**: Focus on what matters
- **Customizable Views**: Read your way
- **Seamless Navigation**: Find news effortlessly

## Tech Stack 🛠️

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.12+
- **AI/ML**: NLTK, TextBlob, Transformers
- **Development**: pnpm (>=9.0.0)

## Development 👩‍💻

For detailed development information and roadmap, see:
- [Development Guide](.cursor/rules/development.md)
- [Project Roadmap and Phased build approach](roadmap.md)

### Development Notes 📝
- **Image Domains**: By default, all image domains are allowed in Next.js configuration for seamless news article display. This is configured in `next.config.js` and enforced through `.cursorrules`.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- News data provided by [NewsAPI](https://newsapi.org)
- NLP features powered by NLTK and TextBlob
- UI components from Tailwind CSS

## API Endpoints

- GET `/api/news` - Get news articles with optional category and search filters
- GET `/api/categories` - Get available news categories
- GET `/api/health` - Check API health status

