# Google Ads Simulator (PWA Edition)

This is the revamped, Progressive Web App version of the Google Ads Simulator. It is designed to be robust, easily deployable, and run smoothly in any modern browser.

**Location:** All source code is in the `/app` directory.

## Features
*   **Progressive Web App:** Installable on desktop/mobile, offline capable.
*   **Modern Stack:** React + Vite + Tailwind CSS.
*   **Educational Tools:** Ad Strength meter, PDF Export, Realistic UI.

## How to Run Locally

1.  Navigate to the app directory:
    ```bash
    cd app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the dev server:
    ```bash
    npm run dev
    ```

## Deployment Instructions

### Cloudflare Pages (Recommended)

1.  **Project Root:** Set the "Root Directory" in Cloudflare to `app`.
2.  **Build Command:** `npm run build`
3.  **Output Directory:** `dist`
4.  **Deploy Command:** *(Leave Blank)*

### GitHub Pages

1.  Run the deploy script from the `/app` directory:
    ```bash
    npm run deploy:gh
    ```
    This will build the PWA and push it to the `gh-pages` branch.

## Why this version?
This version separates the modern application from the legacy code, ensuring a clean slate. It uses `vite-plugin-pwa` to ensure the app behaves like a native application.
