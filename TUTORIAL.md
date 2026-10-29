# Make an inspectable calling card

Run `npm ci`, then `npm run dev`. Run `npm run build` to create the production site.

The page shows only a card and its name. React and CSS 3D provide the inspection
interaction; this example does not reproduce Card Tycoon's implementation.

## 1. Create a scene

In `src/style.css`, `.stage` uses `perspective: 1100px`. Perspective gives the card foreshortening: its farther edge appears smaller. A smaller perspective value makes this more dramatic.

## 2. Put two faces back to back

`.card` has `transform-style: preserve-3d`. Each `.face` has `backface-visibility: hidden` so you never see mirrored text. The front moves forward 1.5px; the back rotates 180 degrees and moves forward in its own coordinate system. This leaves a small separation between the faces. It is a two-face CSS card, not a closed mesh with modeled edges.

## 3. Map dragging to rotation

In `src/main.jsx`, pointer-down records the cursor and current rotation. Pointer-move adds horizontal displacement to Y rotation and subtracts vertical displacement from X rotation. X is limited to 75 degrees in either direction. Pointer capture keeps receiving movement outside the card; `touch-action: none` enables touch dragging on it. Pointer-up/cancel ends the gesture.

The transform is `rotateX(x) rotateY(y)`. Horizontal dragging adds half the
pointer displacement to Y; vertical dragging subtracts 0.4 times the displacement
from X. The starting angle is X = -12 degrees, Y = -22 degrees.

Focus the card and use the arrow keys to turn it in 10-degree steps. Double-click,
Home, or Escape restores the starting angle. There are no visible controls.

## 4. Personalize

Change `CARD_NAME` in `src/main.jsx` to replace `A. Soriano`. The same name appears
on both faces. Edit the backgrounds in `src/style.css` to change the card's finish.

## Next.js version

Copy `App` into a component with `'use client'` at the top (it uses state and pointer events). Export it as default instead of calling `createRoot`. Put these styles into `app/globals.css`, import that file from your root layout, and render the component from `app/page.jsx`.

For actual thickness, dynamic reflections, free orbit, and physically based lighting, the next step is Three.js with React Three Fiber: a thin box mesh, separate front/back textures, lighting, and OrbitControls. CSS is a smaller starting point for learning the interaction.
