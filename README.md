# Google Ads Simulator

A modern, educational simulation of the Google Ads platform designed for MARK 4360 students. Built with React, Vite, and Tailwind CSS.

## Features
*   **Realistic Interface:** Mimics Google's Material Design 3.
*   **Ad Strength Meter:** Real-time feedback on ad relevance and variety.
*   **Keyword Match Types:** Support for Broad, Phrase, and Exact match logic.
*   **PDF Export:** Generates a professional campaign report for assignment submission.

## Setup Instructions

Since this is a React application, it requires Node.js to build and run.

1.  **Install Dependencies:**
    Open your terminal in this directory and run:
    ```bash
    npm install
    ```

2.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    Open the local URL (usually `http://localhost:5173`) in your browser.

3.  **Build for Production (GitHub Pages):**
    ```bash
    npm run build
    ```
    This will create a `dist/` folder containing the static website.

## Deployment to GitHub Pages
1.  Push this code to a GitHub repository.
2.  Go to Settings > Pages.
3.  Source: **GitHub Actions**.
4.  Use the "Static HTML" workflow or configure a Vite workflow to build from the `dist` folder.

## Technologies
*   **React:** UI Library
*   **Vite:** Build Tool
*   **Tailwind CSS:** Styling
*   **jsPDF:** PDF Generation
*   **Lucide React:** Icons
