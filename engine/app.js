/* ══════════════════════════════════════════════════════════════════
   THE MTGRP ENVIRONMENT ENGINE
   Vanilla JS state manager for the image stack + lead gate.

   The whole app is two pieces of state:
     state.layout — which infill scenario is showing  (mutually exclusive)
     state.onGrid — whether the municipal grid is up  (independent)

   Everything else is a projection of those two values onto CSS classes.
   ══════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── COPY ─────────────────────────────────────────────────────────
     Kept as data so the studio can rewrite the argument without
     touching the logic below.
     ───────────────────────────────────────────────────────────────── */

  var LAYOUTS = {
    single: {
      label: "Single Professional",
      note:
        "One volume, undivided. Storage and services compressed into the wet " +
        "wall so the floor plate stays whole. Nothing here is load-bearing " +
        "except the frame you did not choose.",
      /* Interior temperature at 15:00 in August, outdoor 34 °C */
      tempOnGrid: 24.0,
      tempOffGrid: 29.2
    },
    family: {
      label: "Growing Family",
      note:
        "Two sleeping rooms subdivided from the same slab, arranged around " +
        "the shared core. The partitions are demountable: the plan you need " +
        "in 2031 is a weekend of work, not a demolition permit.",
      tempOnGrid: 24.0,
      tempOffGrid: 29.8
    },
    multigen: {
      label: "Multi-Generational",
      note:
        "Two autonomous units meeting at a shared threshold. Separate " +
        "entries, separate services, one roof. The support absorbs the " +
        "second kitchen without a structural argument.",
      tempOnGrid: 24.0,
      tempOffGrid: 30.1
    }
  };

  var THERMAL_COPY = {
    on:
      "The grid is holding. Mechanical cooling is available — though the " +
      "building is not relying on it.",
    off:
      "The grid is down and the apartment barely notices. Deep structural " +
      "shading keeps August sun off the glazing before it becomes heat. " +
      "Cross-ventilation draws sea air through the plate on the prevailing " +
      "west wind. Exposed thermal mass in the slabs absorbs the day and " +
      "releases it after midnight. Outdoors 34 °C; inside, this."
  };

  /* ── STATE ──────────────────────────────────────────────────────── */

  var state = {
    layout: "single",
    onGrid: true
  };

  /* ── DOM ────────────────────────────────────────────────────────── */

  var els = {
    layoutButtons: document.querySelectorAll(".seg-btn"),
    layoutLayers: document.querySelectorAll(".layout-layer"),
    thermalLayer: document.getElementById("layer-thermal"),
    gridToggle: document.getElementById("grid-toggle"),
    gridState: document.getElementById("grid-state"),
    layoutNote: document.getElementById("layout-note"),
    thermalNote: document.getElementById("thermal-note"),
    readout: document.querySelector(".stage-readout"),
    readoutLayout: document.getElementById("readout-layout"),
    readoutGrid: document.getElementById("readout-grid"),
    readoutTemp: document.getElementById("readout-temp"),
    gateForm: document.getElementById("gate-form"),
    gateEmail: document.getElementById("gate-email"),
    gateError: document.getElementById("gate-error"),
    gateSubmit: document.getElementById("gate-submit"),
    gateSuccess: document.getElementById("gate-success")
  };

  /* ══════════════════════════════════════════════════════════════════
     PHASE 1 — SPATIAL AGENCY
     Mutually exclusive: clear .active everywhere, then set it on the
     chosen button and its matching image layer.
     ══════════════════════════════════════════════════════════════════ */

  function setLayout(key) {
    if (!LAYOUTS[key]) return;
    state.layout = key;

    els.layoutButtons.forEach(function (btn) {
      var on = btn.dataset.layout === key;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    els.layoutLayers.forEach(function (layer) {
      layer.classList.toggle("active", layer.dataset.layout === key);
    });

    els.layoutNote.textContent = LAYOUTS[key].note;
    render();
  }

  els.layoutButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLayout(btn.dataset.layout);
    });
  });

  /* ══════════════════════════════════════════════════════════════════
     PHASE 2 — THERMAL DELIGHT
     Independent of the layout. Toggle OFF reveals the bioclimatic map.
     ══════════════════════════════════════════════════════════════════ */

  function setGrid(isOn) {
    state.onGrid = isOn;

    /* Grid OFF -> thermal layer visible. */
    els.thermalLayer.classList.toggle("active", !isOn);

    els.gridState.textContent = isOn ? "Connected" : "Outage — hour 6";
    els.gridState.classList.toggle("is-offgrid", !isOn);

    els.thermalNote.textContent = isOn ? THERMAL_COPY.on : THERMAL_COPY.off;
    els.thermalNote.classList.toggle("is-offgrid", !isOn);

    render();
  }

  els.gridToggle.addEventListener("change", function () {
    setGrid(els.gridToggle.checked);
  });

  /* ── Shared readout ─────────────────────────────────────────────── */

  function render() {
    var cfg = LAYOUTS[state.layout];
    var temp = state.onGrid ? cfg.tempOnGrid : cfg.tempOffGrid;

    els.readoutLayout.textContent = cfg.label;
    els.readoutGrid.textContent = state.onGrid ? "Connected" : "Offline";
    els.readoutTemp.textContent = temp.toFixed(1) + " °C";
    els.readout.classList.toggle("is-offgrid", !state.onGrid);
  }

  /* ══════════════════════════════════════════════════════════════════
     THE LEAD GATE — email capture + generated manifesto
     ══════════════════════════════════════════════════════════════════ */

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function showError(msg) {
    els.gateError.textContent = msg;
    els.gateError.hidden = false;
    els.gateEmail.classList.add("is-invalid");
  }

  function clearError() {
    els.gateError.hidden = true;
    els.gateEmail.classList.remove("is-invalid");
  }

  els.gateEmail.addEventListener("input", clearError);

  /* jsPDF normally arrives from the CDN tag in index.html. If that request
     was blocked, fall back to the vendored copy rather than dead-ending a
     lead who has already handed over their email. */
  function ensureJsPDF() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(true);
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = "vendor/jspdf.umd.min.js";
      s.onload = function () { resolve(!!(window.jspdf && window.jspdf.jsPDF)); };
      s.onerror = function () { resolve(false); };
      document.head.appendChild(s);
    });
  }

  els.gateForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = els.gateEmail.value.trim();

    if (!EMAIL_RE.test(email)) {
      showError("A valid email, please — the manifesto has nowhere else to go.");
      els.gateEmail.focus();
      return;
    }

    clearError();

    /* ── LEAD CAPTURE ────────────────────────────────────────────────
       Logged to the console for now. MTGRP team: POST this payload to
       your webhook / CRM endpoint here. It already carries the two
       pieces of state that qualify the lead — which configuration they
       explored, and whether they ran the outage simulation.
       ─────────────────────────────────────────────────────────────── */
    var lead = {
      email: email,
      layout: state.layout,
      exploredOutage: !state.onGrid,
      capturedAt: new Date().toISOString(),
      source: "environment-engine"
    };
    console.log("[MTGRP] Lead captured:", lead);

    els.gateSubmit.disabled = true;
    els.gateSubmit.textContent = "Generating…";

    ensureJsPDF().then(function (ready) {
      if (!ready) {
        showError("The manifesto generator could not load. Check your connection and retry.");
        els.gateSubmit.textContent = "Download MTGRP Open Building Manifesto";
        els.gateSubmit.disabled = false;
        return;
      }

      try {
        buildManifesto(email);

        els.gateSuccess.textContent =
          "Manifesto downloaded. Our studio will be in touch.";
        els.gateSuccess.hidden = false;
        els.gateSubmit.textContent = "Download again";
      } catch (err) {
        console.error("[MTGRP] PDF generation failed:", err);
        showError("The manifesto could not be generated. Please retry.");
        els.gateSubmit.textContent = "Download MTGRP Open Building Manifesto";
      } finally {
        els.gateSubmit.disabled = false;
      }
    });
  });

  /* ── PDF ────────────────────────────────────────────────────────── */

  function buildManifesto(email) {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    var W = 210;
    var H = 297;
    var M = 20;              /* margin */
    var COL = W - M * 2;

    var INK = [244, 244, 244];
    var MUTED = [136, 136, 136];
    var ACCENT = [243, 156, 18];
    var LINE = [42, 42, 42];

    /* Full-bleed dark ground */
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, W, H, "F");

    /* ── Masthead ── */
    doc.setTextColor(ACCENT[0], ACCENT[1], ACCENT[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(42);
    doc.text("MTGRP", M, 38);

    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("METAGROUPE  ·  BEIRUT  ·  MADRID  ·  MILAN", M, 45);

    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.setLineWidth(0.3);
    doc.line(M, 52, W - M, 52);

    /* ── Title ── */
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("The Open Building Manifesto", M, 66);

    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("On spatial agency and thermal delight", M, 73);

    /* ── Body ── */
    var y = 88;

    var sections = [
      {
        h: "01 — THE SUPPORT AND THE INFILL",
        b:
          "John Habraken argued that a building is not one object but two, running on two " +
          "different clocks. There is the support — structure, cores, services — which " +
          "belongs to the community and outlives everyone who will ever live in it. And there " +
          "is the infill — partitions, fittings, surfaces — which belongs to the " +
          "household and must change as fast as a life does. Conventional practice fuses the " +
          "two and calls the result permanent. It is not permanent. It is merely difficult to " +
          "change, which is a different thing, and a more expensive one."
      },
      {
        h: "02 — THE RESIDENT AS AUTHOR",
        b:
          "MTGRP designs the support with enough generosity that the infill becomes yours to " +
          "author. A dwelling that begins as one open volume for one person should become a " +
          "family's plan, and later a multi-generational household, without a structural " +
          "argument or a demolition permit. We build the capacity for that change in at the " +
          "outset, where it costs almost nothing, rather than pretending it will never be needed."
      },
      {
        h: "03 — CLIMATE AS MATERIAL",
        b:
          "Philippe Rahm treats temperature, humidity and light as the actual matter of " +
          "architecture — not as an afterthought delegated to equipment. In Beirut this " +
          "stops being theory. When the municipal grid fails, a building conditioned only by " +
          "machines becomes uninhabitable within hours. One conditioned by its own form does not."
      },
      {
        h: "04 — RESILIENCE, PLAINLY",
        b:
          "Deep structural shading intercepts August sun before it becomes heat. " +
          "Cross-ventilation is planned on the prevailing west wind, so the plate flushes " +
          "itself. Exposed thermal mass absorbs the day and releases it after midnight. None " +
          "of this requires power. All of it requires having been designed. That is the whole " +
          "of our argument: comfort should not be something you purchase by the kilowatt-hour."
      }
    ];

    sections.forEach(function (s, i) {
      /* Hairline above every section but the first — editorial structure,
         and it distributes the column evenly down the page. */
      if (i > 0) {
        doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
        doc.setLineWidth(0.2);
        doc.line(M, y - 11, W - M, y - 11);
      }

      doc.setTextColor(ACCENT[0], ACCENT[1], ACCENT[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(s.h, M, y);
      y += 6.5;

      doc.setTextColor(INK[0], INK[1], INK[2]);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      var lines = doc.splitTextToSize(s.b, COL);
      doc.text(lines, M, y);
      y += lines.length * 4.5 + 24;
    });

    /* ── Colophon ── */
    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.line(M, H - 34, W - M, H - 34);

    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Prepared for " + email, M, H - 26);
    doc.text(
      "Issued " + new Date().toISOString().slice(0, 10) + "  ·  mtgrp.xyz  ·  metagroupearch@gmail.com",
      M,
      H - 21
    );

    doc.setTextColor(ACCENT[0], ACCENT[1], ACCENT[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("A support is a promise. An infill is a sentence you get to write yourself.", M, H - 13);

    doc.save("MTGRP-Open-Building-Manifesto.pdf");
  }

  /* ── BOOT ───────────────────────────────────────────────────────── */

  /* Honour the markup's defaults rather than assuming them: the toggle
     ships checked, the first scenario ships active. */
  setLayout(state.layout);
  setGrid(els.gridToggle.checked);

})();
