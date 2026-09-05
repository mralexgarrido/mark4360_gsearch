# Maintainer guide

## Pre-merge deployment blockers

The repository currently contains two GitHub Pages workflows:

| File | Trigger | Published artifact |
| --- | --- | --- |
| `.github/workflows/deploy.yml` | Push to main/master or manual dispatch | Builds with npm, then uploads `dist/` |
| `.github/workflows/static.yml` | Push to main or manual dispatch | Uploads the repository root without building |

Both use the Pages environment and the `pages` concurrency group, with different cancellation settings. A new commit to main can therefore run conflicting publishing paths. The root contains React source that requires a build; uploading it is not equivalent to publishing `dist/`.

The build workflow uses `npm ci` and Node.js 20, but no dependency lockfile is committed. Reconcile the install strategy and lockfile before relying on that workflow. Do not silently generate a lockfile or replace the runtime as part of documentation work.

**Keep documentation changes unmerged until the maintainer has reviewed these deployment issues.** The documentation branch does not match either workflow's push filters. Resolve publishing in a separate focused change with an explicit production approval and a prior working deployment recorded.

## Hosting configuration

The manifest also provides a Wrangler Pages deployment command, and both `wrangler.json` and `wrangler.toml` exist. Their presence does not prove which host is live or which file and dashboard settings govern it. Inspect **Settings > Pages**, recent Actions runs, and the actual connected Cloudflare project before changing any publishing settings.

For Cloudflare, first establish whether the project is Pages Git integration, Pages direct upload, or a Worker. A Workers-versus-Pages command error indicates that the deployment path and command need reconciliation; it is not a reason to blindly delete a dashboard field or run a replacement deployment command.

Vite currently uses relative asset paths and builds to `dist/`. Preserve the current site unless a separately approved hosting change has a clear benefit.

## Local validation

Use `npm install` in an isolated checkout, followed by `npm run build` and `npm run preview`. No lint or test script is currently declared. Record resolved dependency versions and any newly generated lockfile separately from documentation changes.

With fictional data, check campaign setup, broad/phrase/exact keyword entry, duplicate keyword handling, audience selections, ad preview, review, and PDF export. Reload to check persistence. Review keyboard navigation, mobile layout, and the effect of clearing saved site data. Source inspection is not a substitute for those tests.

## Project updates

For a reviewed milestone, explain the learner-visible improvement, fixes, limitations, and any effect on stored drafts. Tie release notes to a tested commit. Do not create historic release entries from guesses or publish a tag that may activate automation without review.

Suggested About description: **Practice search-campaign setup, keyword targeting, ad copy, and strategy review in a browser-based teaching simulator.** Suggested topics: `marketing-education`, `search-advertising`, `react`, `vite`.

Verify the app URL before configuring About's website. Use an actual screenshot without student data for a social preview. These settings are not changed by this guide.

## Rollback

Before merge, closing the documentation PR leaves main unchanged. After an approved merge, revert the documentation commit through a new PR. Because even a documentation merge can trigger the conflicting workflows, record the current live deployment and resolve the publishing path before merging or attempting a production rollback.
