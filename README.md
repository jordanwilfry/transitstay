# TransitStay - Travel Mood Board

A beautiful and responsive mood board application for organizing travel inspiration, built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

✨ **Beautiful Design** - Warm, modern UI with smooth animations and transitions
🎨 **Cluster Organization** - Organize your travel inspiration into themed clusters (Food, Lodging, Sunset views, etc.)
📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile devices
🖼️ **Masonry Layout** - Pinterest-style grid layout for optimal space usage
🎭 **Interactive Elements** - Hover effects, drag & drop, and smooth animations
🔧 **TypeScript Support** - Full type safety throughout the application
💾 **Local Storage** - Persistent data storage in the browser
🌟 **Modern Stack** - Built with the latest Next.js, React, and Tailwind CSS

## Design Highlights

- **Warm Color Palette**: Brownish/taupe background with vibrant cluster colors
- **Cluster Cards**: Color-coded cards with icons (🍽️ Food, 🌅 Sunset view, 🏨 Lodging)
- **Image Grid**: Masonry-style layout with hover overlays and author information
- **Modal Design**: Clean, centered modals with blur backdrop
- **Responsive Grid**: Adapts from 1 column on mobile to 5 columns on large screens

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd transitstay
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind CSS
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components (Button, Modal, Input)
│   └── moodboard/        # Moodboard-specific components
├── hooks/                # Custom React hooks
├── screens/              # Page-level components
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and constants
```

## Key Components

### MoodboardPage
The main page component that orchestrates the entire mood board experience.

### ClusterCard
Individual cluster cards with color coding, icons, and post counts.

### PostCard  
Image cards with hover effects, author information, and assignment controls.

### CreateClusterModal
Modal for creating new clusters with form validation.

## Customization

### Adding New Cluster Types
1. Update `CLUSTER_ICONS` in `src/utils/constant.tsx`
2. Add corresponding colors to `CLUSTER_COLORS`
3. The app will automatically assign icons and colors to new clusters

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Tailwind CSS classes throughout components
- Color scheme: CSS custom properties in `globals.css`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern mood board applications
- Images from Unsplash API
- Icons from Lucide React
- Color palette inspired by warm, travel-themed aesthetics

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
