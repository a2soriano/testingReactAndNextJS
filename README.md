# Inspectable calling card

A minimal React page showing a landscape 3D calling card with a name on both
faces. Its 7:4 proportions match a 3.5 × 2 inch business card.
Drag to rotate it, or focus it and use the arrow keys. Double-click, Home, or
Escape restores the starting angle. Change `CARD_NAME` in `src/main.jsx` to set
the name. Read [TUTORIAL.md](TUTORIAL.md) for how it works.

## Run locally

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
```

Use the address printed by Vite. Opening `index.html` directly or publishing the
source files with a basic static server will not run the React JSX source.

## Build and preview

```sh
npm run build
npm run preview
```

Publish the contents of `dist`, which contains compiled JavaScript and CSS. The
Vite configuration uses relative asset URLs so the build also works under a
repository path such as `/testingReactAndNextJS/`.

## Deploy to GitHub Pages

1. In the GitHub repository, open **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main`, or run **Deploy calling card to GitHub Pages** from the
   **Actions** tab.
4. Wait for the deployment job to succeed, then open the URL shown in Pages.

The included workflow builds the app and deploys `dist`. Publishing the raw
`main` branch instead can show a blank page because browsers cannot execute
`src/main.jsx` without Vite compiling it first.
