# Recommendations for Google Ads Simulator Modernization

## 1. Executive Summary
The goal is to transform the existing single-page prototype into an "award-winning" educational tool for MARK 4360 students. The current application is functional but lacks the visual fidelity, interactive feedback, and educational depth required to simulate the complexity of the real Google Ads platform.

**Recommendation:** Re-architect the application using a modern frontend framework (React) to enable complex state management, real-time validation, and a component-based design that mirrors the actual Google Ads interface (Material Design).

## 2. Evaluation of Existing App
*   **Strengths:** Simple, lightweight, covers basic parameters (Keywords, Headlines, Budget).
*   **Weaknesses:**
    *   **Visual Fidelity:** Looks like a generic web form, not the Google Ads dashboard.
    *   **Feedback Loop:** No real-time guidance on whether the ad is "good" or "bad".
    *   **Validation:** Basic HTML5 validation is insufficient for teaching ad policy constraints.
    *   **Architecture:** Single HTML file limits scalability and state management (e.g., sharing keywords between the targeting tab and the ad strength calculator).

## 3. Comprehensive Recommendations

### A. Architecture & Technology
*   **Framework:** **React (via Vite)**.
    *   *Why?* Allows for "Ad Strength" logic to run in real-time as the student types. Enables a modular codebase (Campaign, AdGroup, Ads components).
*   **State Management:** React Context or Redux Toolkit.
    *   *Why?* To manage the complex dependency between "Selected Keywords" and "Ad Copy" (e.g., checking if keywords appear in headlines).
*   **Deployment:** GitHub Pages (Static Site Generation).
    *   *Why?* Zero cost, easy for instructors to host/fork.

### B. User Experience (The "Award-Winning" Feel)
*   **Visual Design:** strict adherence to Google's **Material Design 3**. Use a library like MUI (Material UI) to get the specific buttons, inputs, and layout spacing of Google products.
*   **Navigation:** Left-sidebar navigation (Campaign -> Settings -> Keywords -> Ads) mirroring the actual platform flow.
*   **Ad Preview:** A persistent, high-fidelity mobile/desktop ad preview that updates keystroke-by-keystroke.

### C. Educational & Simulation Features
*   **Real-time "Ad Strength" Meter:**
    *   Implement an algorithm that grades the ad (Incomplete -> Poor -> Average -> Good -> Excellent).
    *   *Criteria:*
        1.  Are there at least 8 headlines?
        2.  Do headlines include top keywords?
        3.  Are descriptions unique?
    *   *Educational Value:* Teaches students *how* Google's algorithm rewards relevance.
*   **Contextual Learning:**
    *   "Info" icons next to jargon (e.g., "Target CPA", "Broad Match"). Hovering explains the concept in plain English.
*   **Constraint Simulation:**
    *   Enforce hard limits (30 chars for headlines, 90 for descriptions).
    *   Simulate warnings (e.g., "Your budget might be too low for this location").

### D. Submission & Grading
*   **PDF Report Generation:**
    *   Use `jspdf` to generate a branded "Campaign Report".
    *   **Content:**
        *   Student Strategy Statement (Reflection).
        *   Visual Ad Preview (rendered image of the ad).
        *   Campaign Settings Table.
        *   Ad Strength Scorecard.
    *   *Why?* A PDF is a permanent, unalterable record for grading that looks professional.

## 4. Implementation Plan
1.  **Scaffold:** Create React app structure.
2.  **UI Core:** Implement the Google Ads "Shell" (Header, Sidebar, Main Content Area).
3.  **Logic:** Build the `AdStrengthCalculator` and `CampaignStore`.
4.  **Export:** Integrate PDF generation logic.
