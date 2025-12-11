# Google Ads Simulator

A modern, educational simulation of the Google Ads platform designed for MARK 4360 students. Built with React, Vite, and Tailwind CSS.

## Features
*   **Realistic Interface:** Mimics Google's Material Design 3.
*   **Ad Strength Meter:** Real-time feedback on ad relevance and variety.
*   **Keyword Match Types:** Support for Broad, Phrase, and Exact match logic.
*   **PDF Export:** Generates a professional campaign report for assignment submission.

## Local Development

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    Open the local URL (usually `http://localhost:5173`) in your browser.

## Deployment Instructions

### Option 1: GitHub Pages (Recommended)

This repository includes an automated GitHub Actions workflow.

1.  **Push to GitHub:** Upload this code to a new GitHub repository.
2.  **Enable Actions:**
    *   Go to your repository **Settings**.
    *   Click **Pages** (in the left sidebar).
    *   Under **Build and deployment** > **Source**, select **GitHub Actions**.
3.  **Trigger Deployment:**
    *   Making a commit to the `main` or `master` branch will automatically trigger the build.
    *   You can verify the status in the **Actions** tab.
    *   Once complete, your URL will appear in the Settings > Pages section.

### Option 2: Cloudflare Pages

1.  **Connect Git:**
    *   Log in to the Cloudflare Dashboard and go to **Workers & Pages**.
    *   Click **Create Application** > **Pages** > **Connect to Git**.
    *   Select your repository.
2.  **Configure Build:**
    *   **Project Name:** `mark4360gsearch` (or your chosen name)
    *   **Framework Preset:** Select **Vite** (or React).
    *   **Build Command:** `npm run build`
    *   **Build Output Directory:** `dist`
    *   **Root Directory:** (Leave blank)
3.  **Deploy:** Click **Save and Deploy**.

---

### 🚨 Cloudflare Dashboard Configuration Verification 🚨

If you are editing the **Build configuration** settings (as seen in your screenshot), ensure they match this exactly:

| Setting | Value |
| :--- | :--- |
| **Build command** | `npm run build` |
| **Deploy command** | *(Leave this BLANK / Empty)* |
| **Non-production...** | *(Leave this BLANK / Empty)* |
| **Build output directory** | `dist` |
| **Path** | `/` |

**Why?**
*   **Build command:** Compiles your code.
*   **Deploy command:** Should be empty because Cloudflare automatically uploads the `dist` folder for you. Setting this to `npm run build` (or anything else) is incorrect for this setup.
