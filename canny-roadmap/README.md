# Canny Roadmap

GitHub Pages prototype for viewing quarterly roadmap timelines from Canny.

## How it works

- GitHub Actions fetches Canny ideas and writes `data/roadmap.json`
- The hosted page reads that JSON as a static asset
- Drag and resize changes are stored in each viewer's browser local storage

## Required GitHub secret

- `CANNY_API_KEY`

## Optional GitHub secrets or variables

- `CANNY_GROUP_ID`
- `CANNY_BOARD_ID`

## Local note

This Pages version is intentionally static. If you later want shared drag-and-drop edits across PMs, we should add a real backend.
