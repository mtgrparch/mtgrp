# The MTGRP Environment Engine

An interactive manifesto and inbound lead funnel, live at **`mtgrp.xyz/engine/`**.

Pure HTML + CSS + vanilla JS. No build step, no framework — GitHub Pages serves
these files as-is. It is deliberately kept in this subdirectory so it deploys
alongside the main site at `/` without touching it.

```
engine/
  index.html    markup + the image stack
  style.css     dark editorial theme, split-screen layout
  app.js        state manager + jsPDF manifesto generator
  assets/       the isometric renders  ← THE ONE THING YOU REPLACE
  vendor/       offline copy of jsPDF (fallback only)
```

---

## Dropping in the Twinmotion renders

Replace these five files. **Keep the filenames and paths identical** — nothing
in the code needs to change.

| File | Layer | What it is |
|---|---|---|
| `assets/base-frame.png` | base, `z-index: 10` | The support. Slabs, columns, cores. Always visible. |
| `assets/layout-single.png` | infill, `z-index: 20` | Single Professional |
| `assets/layout-family.png` | infill, `z-index: 20` | Growing Family |
| `assets/layout-multigen.png` | infill, `z-index: 20` | Multi-Generational |
| `assets/thermal-grid-off.png` | climate, `z-index: 30` | Bioclimatic heat map, shown when the grid is switched OFF |

**The files currently in `assets/` are procedurally generated placeholders.**
They exist so the stacking engine is visible and testable before the real
renders land. They are not design work — overwrite them.

### Export rules that actually matter

1. **Identical camera, identical canvas size, for all five.** The layers are
   stacked absolutely on top of one another. If the camera shifts even slightly
   between exports, the infill will not line up with the frame. Export them in
   one Twinmotion session without touching the viewport.
2. **Transparent background** (PNG-24 with alpha) on all layers *except*
   `base-frame.png`, which may be opaque if you prefer.
3. **The thermal map should be light-toned** — pale oranges, yellows, blues.
   It is composited with `mix-blend-mode: multiply`, so it *darkens toward its
   own hue*. White areas leave the architecture untouched; saturated areas tint
   it. A dark heat map will simply read as black.
4. Keep them reasonably sized (~1600px wide, compressed) — this is the whole
   payload of the page.

Adding a fourth scenario means: one `<img class="stack-layer layout-layer">`
with a `data-layout` key in `index.html`, one `<button class="seg-btn">` with
the same key, and one entry in the `LAYOUTS` object in `app.js`.

---

## Wiring up the leads

Right now a submitted email is validated and logged to the browser console:

```js
console.log("[MTGRP] Lead captured:", lead);
```

That `lead` object is in `app.js` (search for `LEAD CAPTURE`). It already
carries the qualifying context — which configuration they explored, and whether
they ran the outage simulation:

```js
{ email, layout, exploredOutage, capturedAt, source }
```

To start collecting for real, POST it to a form endpoint (Formspree, Basin,
Netlify Forms, a Google Apps Script — anything that accepts a JSON POST from a
static page). Add the `fetch` next to the `console.log`. The PDF download does
not depend on it, so a failed POST will never cost you the download.

---

## jsPDF

Loaded from cdnjs in `index.html`. If that request fails — blocked network,
flaky routing, an office firewall — `app.js` falls back to `vendor/jspdf.umd.min.js`
automatically, so the manifesto still generates. That fallback is why the
vendored copy is committed.

The CDN tag deliberately carries **no `integrity` attribute**: a wrong
subresource-integrity hash silently breaks the download button in production,
and the hash could not be verified from the build environment. To add one,
verify it against the file cdnjs actually serves:

```
curl -s https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js \
  | openssl dgst -sha384 -binary | openssl base64 -A
```

then set `integrity="sha384-<that value>"` on the script tag.

---

## Running it locally

Open it over HTTP, not `file://` (the fallback script injection needs a real
origin):

```
python3 -m http.server 8000
# → http://127.0.0.1:8000/engine/
```
