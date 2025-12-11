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

### Option 1: GitHub Pages (Manual Branch Deployment)

You have chosen to deploy manually from a branch, without using GitHub Actions.

1.  **Install Dependencies:**
    Make sure you have run `npm install` locally. This will install the `gh-pages` tool.

2.  **Run Deployment Script:**
    Run the following command in your terminal:
    ```bash
    npm run deploy:gh
    ```
    **What this does:**
    *   It automatically runs `npm run build` to compile your code into the `dist` folder.
    *   It creates a **new branch** called `gh-pages` (if it doesn't exist).
    *   It pushes the contents of the `dist` folder to that branch.

3.  **Configure GitHub Settings:**
    *   Go to your repository on GitHub.
    *   Click **Settings** > **Pages**.
    *   Under **Build and deployment** > **Source**, select **Deploy from a branch**.
    *   Under **Branch**, select **`gh-pages`** and ensure the folder is **`/(root)`**.
    *   Click **Save**.

Your site will be live shortly!

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

#### 🚨 Troubleshooting Cloudflare Dashboard 🚨

If you edit the build settings, ensure they look like this:

| Setting | Value |
| :--- | :--- |
| **Build command** | `npm run build` |
| **Deploy command** | *(Leave this BLANK / Empty)* |
| **Build output directory** | `dist` |

**Do NOT** set "Deploy command" to `npx wrangler deploy` or `npm run build`. Keep it empty.

---

**Note:** This application uses `HashRouter` to ensure compatibility with all static hosting environments. Your URLs will look like `your-site.com/#/campaign`.
