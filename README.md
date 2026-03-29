# 🌿 Paradise Nursery — e-plantShopping

A React + Redux shopping cart application for an online plant shop.

## Features
- **Landing Page** — Hero section with CTA linking to product listing
- **Navigation Bar** — Sticky nav with Home, Plants & Cart links; live cart badge count
- **Product Listing** — 4 plant categories with 4 cards each (image, description, price, Add to Cart)
- **Cart Page** — Quantity +/− controls, per-item subtotals, delete, order summary, Checkout button
- **Redux State** — Global cart managed with Redux Toolkit

## Tech Stack
- React 18 + Vite
- Redux Toolkit + React-Redux
- CSS3 (Google Fonts: Playfair Display + DM Sans)

## Run Locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy to GitHub Pages
1. Add `"homepage": "https://<username>.github.io/e-plantShopping"` to package.json
2. Add `base: '/e-plantShopping/'` to vite.config.js
3. `npm install --save-dev gh-pages`
4. Add scripts: `"predeploy": "npm run build"` and `"deploy": "gh-pages -d dist"`
5. `npm run deploy`

## Project Structure
```
src/
├── App.jsx          # Root + routing + navbar
├── App.css          # All styles
├── ProductList.jsx  # Plant catalogue
├── CartItem.jsx     # Cart page
├── CartSlice.jsx    # Redux slice
├── store.js         # Redux store
└── AboutUs.jsx      # About page
```
