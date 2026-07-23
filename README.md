# mtgrp
metagroupe architecture and urbanism

## Adding a project / photos

1. Drop photos into `photos/` named `pXX-01.webp`, `pXX-02.webp`, …
   (the numbering must start at 01 with no gaps).
2. In `script.js`, add or edit the project's entry in `PROJECTS`:
   - `photos:` — how many photos the project has (shown in its modal)
   - `preview:` — how many of the first photos appear in the homepage grid
3. Regenerate the small grid tiles (only new/changed ones are processed):

   ```
   python tools/make_grid_tiles.py
   ```

4. Commit everything, including the new files in `photos/grid/`.

The grid scrolls through the small `photos/grid/` copies for smooth
performance; project modals always open the full-size originals from
`photos/`. If step 3 is forgotten the site still works — the grid just
falls back to the heavy originals for the new photos (laggy but not broken).
