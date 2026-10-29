# Make an inspectable calling card

Run `npm ci`, then `npm run dev`. Run `npm run build` to create the production site.

This example uses React and CSS 3D. It recreates the general inspect-and-flip interaction, rather than claiming to reproduce Card Tycoon's implementation.

## 1. Create a scene

In `src/style.css`, `.stage` uses `perspective: 1100px`. Perspective gives the card foreshortening: its farther edge appears smaller. A smaller perspective value makes this more dramatic.

## 2. Put two faces back to back

`.card` has `transform-style: preserve-3d`. Each `.face` has `backface-visibility: hidden` so you never see mirrored text. The front moves forward 1.5px; the back rotates 180 degrees and moves forward in its own coordinate system. This leaves a small separation between the faces. It is a two-face CSS card, not a closed mesh with modeled edges.

## 3. Map dragging to rotation

In `src/main.jsx`, pointer-down records the cursor and current rotation. Pointer-move adds horizontal displacement to Y rotation and subtracts vertical displacement from X rotation. X is limited to 75 degrees in either direction. Pointer capture keeps receiving movement outside the stage; `touch-action: none` enables touch dragging inside it. Pointer-up/cancel ends the gesture.

The transform is `rotateX(x) rotateY(y)`. Order matters! Flip adds 180 degrees to Y; reset restores the initial angle. Buttons provide an alternative to dragging.

## 4. Personalize

Change the initial `name` state, or type into the name field. Replace the role text in the front face and add your contact information to the back. The finish changes CSS variables used by both faces. The foil is a static gradient overlay; it is not a physically simulated holographic material.

## Next.js version

Copy `App` into a component with `'use client'` at the top (it uses state and pointer events). Export it as default instead of calling `createRoot`. Put these styles into `app/globals.css`, import that file from your root layout, and render the component from `app/page.jsx`.

For actual thickness, dynamic reflections, free orbit, and physically based lighting, the next step is Three.js with React Three Fiber: a thin box mesh, separate front/back textures, lighting, and OrbitControls. CSS is a smaller starting point for learning the interaction.
