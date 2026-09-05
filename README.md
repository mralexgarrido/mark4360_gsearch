# Google Ads Simulator

Build a search-campaign plan, explain your targeting choices, and review the result before using a real advertising platform.

This MARK 4360 learning tool provides a React-based workspace for campaign setup, keyword and audience targeting, ad copy, and strategy review. It is intended for classroom practice and discussion, not media buying.

**[Open the simulator](https://mralexgarrido.github.io/mark4360_gsearch/)** · [Report an issue](https://github.com/mralexgarrido/mark4360_gsearch/issues) · [Maintainer guide](MAINTAINING.md)

## What learners can practice

- Set campaign identity, budget, dates, bidding, networks, locations, and languages.
- Add keywords using broad, phrase, or exact notation, and discuss how match choices relate to search intent.
- Draft headlines and descriptions, inspect an ad preview and local strength feedback, and prepare a campaign review with a strategy explanation and PDF export.

The keyword parser recognizes quoted phrases and bracketed exact keywords. This is a local teaching representation, not a recreation of Google's auction, query matching, or forecasting systems. Ad-strength feedback is not an official Google score.

## Start a practice campaign

Choose a fictional business and customer need. Complete campaign setup, targeting, and ad creation, then review the plan and explain how the choices fit together. Export the review using the application's PDF workflow and follow your instructor's separate submission instructions.

Campaign state is saved automatically in this browser's local storage. It is not an account-based backup and does not sync between devices. Use fictional data on shared computers, keep an exported copy of important work, and clear site data when removing local drafts. Clearing site data is destructive to that browser's saved work.

A useful peer-review prompt is: **Which keyword, ad claim, and destination form the clearest path from customer intent to the desired action?**

## Local development

Install a Node.js version compatible with the dependencies in [package.json](package.json) and npm, then run:

```sh
git clone https://github.com/mralexgarrido/mark4360_gsearch.git
cd mark4360_gsearch
npm install
npm run dev
```

Open the address printed by Vite. To build and inspect the result locally:

```sh
npm run build
npm run preview
```

The Vite configuration uses relative asset paths (`base: './'`); the standard build output is `dist/`. No lockfile is currently committed, so the local instructions use `npm install`, not `npm ci`. Treat any generated lockfile as a separate reviewed change. No lint or automated test script is declared in the current manifest.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/pages/` | Campaign setup, targeting, ad creation, and review |
| `src/components/` | Layout, ad preview, tooltips, and strength feedback |
| `src/contexts/CampaignContext.jsx` | Campaign state, browser persistence, and keyword notation |
| `src/utils/pdfGenerator.js` | Campaign PDF generation |
| `legacy/` | Earlier standalone implementation |

The current interface uses React, Vite, Tailwind CSS, and PDF-related libraries listed in the package manifest.

## Maintenance status

**Before merging a publishing change, review the deployment conflicts in [MAINTAINING.md](MAINTAINING.md).** Two existing Pages workflows publish different directories, and the build workflow expects a lockfile that is not committed. This documentation does not resolve or change those workflows.

[`MARK-4360-Search-Ads-Simulator`](https://github.com/mralexgarrido/MARK-4360-Search-Ads-Simulator) is a separate teaching repository. Its source, storage, and build configuration are independent; do not assume one project's fixes or saved data apply to the other. No retirement or migration decision is implied.

## Support and contributions

Use [GitHub Issues](https://github.com/mralexgarrido/mark4360_gsearch/issues) for reproducible bugs or improvements to teaching clarity. Include the step, browser, expected behavior, actual behavior, and a fictional example. Keep credentials, student records, and real campaign details out of issues and screenshots.

For a contribution, use a focused branch, explain the learner benefit, and record actual build and manual checks. Preserve the existing [LICENSE](LICENSE) and third-party attribution. Maintained by [Alex Garrido](https://github.com/mralexgarrido).

Google and Google Ads are trademarks of their respective owner. This independent educational project is not an official Google product and does not purchase or publish advertising.
