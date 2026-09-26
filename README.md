# EcoPlast

EcoPlast is an AI-assisted plastic waste management web app built with React, Vite and Tailwind CSS.

## Included features

- AI plastic assistant powered by Google Gemini
- Camera/upload based plastic identification
- Plastic usage calculator with weekly, monthly and yearly estimates
- Calculator data persisted in the browser
- CSV export and calculator reset
- AI plastic-type, recyclability and eco-alternative suggestions
- Bioplastic experiment/lab-notes journal with photos
- Photo lightbox with previous/next navigation
- Recycling-center finder using live Google Maps searches and optional browser location
- Responsive mobile navigation
- Accessible labels, buttons and reduced-motion support
- No Gemini API key hardcoded in the source

## Setup

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Gemini API key

Open the assistant using the bottom-right chat button, open settings, and paste a Gemini API key. The key is kept in React state for the current browser session and is not stored in localStorage.

For a production deployment, a backend proxy is recommended so the API key is never exposed to the browser.

## Project structure

```text
src/
  components/
    BioplasticExperiments.jsx
    ChatBot.jsx
    Features.jsx
    Footer.jsx
    Hero.jsx
    HowItWorks.jsx
    Navbar.jsx
    PlasticCalculator.jsx
    RecyclingCenters.jsx
  data/content.js
  hooks/useExperiments.js
  utils/constants.js
  utils/gemini.js
  App.jsx
  index.css
  main.jsx
```

## Notes

- Recycling-center searches open external map results; EcoPlast does not claim that a specific facility accepts a material unless the map/provider confirms it.
- Browser geolocation is used only when the user explicitly clicks **Use my location**.
- Bioplastic photos are stored as base64 data in localStorage. Large numbers of high-resolution photos can exceed browser storage limits; a backend/object-storage implementation is recommended for a larger deployment.
