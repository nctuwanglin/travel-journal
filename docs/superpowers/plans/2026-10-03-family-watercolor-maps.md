# Family Watercolor Itinerary Maps Implementation Plan

> **For agentic workers:** Execute inline using superpowers:executing-plans; preserve the approved image design and existing data.

**Goal:** Apply the user-approved Japanese watercolor travel-map design with five recurring family characters to all 23 trips.

**Architecture:** Versioned PNG assets and saved prompts, existing `mapArt` references, existing maintenance CLI. No application behavior changes.

**Tech Stack:** Built-in imagegen, static JavaScript trip data, Python/Node validation, existing Playwright/PDF CI and GitHub Pages.

**Spec:** User approval in this task on 2026-10-03; reference `img/shikoku-2026-v4.png` copied from the approved slimmer-parent preview.

## Global Constraints

- Central geographic route map, left/right daily itinerary panels, landmark and food thumbnails.
- Japanese watercolor on a light ivory background; no dark title gradient.
- Slim parents; father wears round glasses; three children with distinct sizes. Do not print roles, ages or family count.
- Reuse these characters as illustrations for every historical trip, preserving historical itinerary content.
- Retain all original trip data except versioned `mapArt` paths; retain old assets.
- Use built-in imagegen only. Review outputs before recording alignment.

## Review Focus

- Complete day counts, dates and flight details including cross-year/cross-midnight cases.
- Correct family count and father glasses; no extra child heads.
- Actual map concept and landmark thumbnails preserved; geographically sensible schematic.
- 2024 Hokkaido uses Tigerair both ways; Seoul retains distinct airlines and airports.
- Asset files load in the dashboard and downloaded PDFs without clipping.

## Steps

- [x] Read current 23 trips and save per-trip prompts with next version numbers.
- [x] Copy approved Shikoku preview as v4 without overwriting v3.
- [x] Generate remaining 22 images with approved image as visual reference.
- [x] Inspect each output against its source; fix material omissions before acceptance.
- [x] Copy final assets into `img/`, update `data/trips.js` mapArt only and `data/maintenance.js` through `record-map`.
- [x] Write batch manifest including prompts, final image paths and review notes.
- [x] Run `python3 tools/version_assets.py`, `python3 -B validate_trips.py`, Python and Node test suites, and `git diff --check`.
- [x] Compare trip JSON with HEAD excluding mapArt to prove no itinerary changes.
- [ ] Commit/push, wait for existing browser/PDF CI and Pages deployment.
- [ ] Verify live data references and representative actual downloaded PDF pages.
