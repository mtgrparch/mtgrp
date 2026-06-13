// ─────────────────────────────────────────────────────────────
//  MTGRP — Project Registry
//
//  FILE IDs are chronological: p01 = oldest, p12 = newest.
//  Add new projects at the TOP of this array with the next
//  number (p13, p14...). The site always shows newest first.
//
//  Fields:
//    id       — filename without .html  (e.g. "p13")
//    title    — full project title
//    subtitle — typology / competition result / etc.
//    desc     — paragraph shown in sidebar of project page
//    location — city / country
//    type     — programme type
//    size     — floor area or scale
//    budget   — if disclosed, otherwise "—"
//    status   — Built / Competition / In progress / etc.
//    photos   — number of photo slots to generate
// ─────────────────────────────────────────────────────────────

const PROJECTS = [

  // ── NEWEST FIRST — add new projects at the top with next id ──

  {
    id: "p12",
    title: "A Home in the Sun",
    subtitle: "Coliving for Seniors",
    desc: "An elderly coliving home for seniors in Lysá nad Labem, Czech Republic. The project proposes a shared domestic environment that rethinks how aging populations inhabit collective space — prioritising thermal comfort, communal activity, and open-ended use over institutional typology. Warmth, both climatic and social, is the organising principle.",
    location: "Lysá nad Labem, CZ",
    type: "Coliving / Housing",
    size: "—",
    budget: "—",
    status: "—",
    photos: 6,
  },
  {
    id: "p11",
    title: "Die Den Gletscher Bewohnen",
    subtitle: "Europan — Winner",
    desc: "Winning entry for the Europan competition. The project addresses inhabitation in proximity to glacial landscape, proposing a model of dwelling that is responsive to extreme thermal and ecological conditions. The glacier is not backdrop but partner — a slow, material presence that shapes the logic of the building.",
    location: "—",
    type: "Competition",
    size: "—",
    budget: "—",
    status: "Winner",
    photos: 5,
  },
  {
    id: "p10",
    title: "Holcim Visitor Center",
    subtitle: "Competition Entry",
    desc: "Competition entry for the Holcim Visitor Center. The proposal engages with the material logic of cement and industrial production as the conceptual basis for a public-facing cultural building. The building performs its own material origin.",
    location: "—",
    type: "Cultural",
    size: "—",
    budget: "—",
    status: "Competition entry",
    photos: 5,
  },
  {
    id: "p09",
    title: "Santa María de Valdeiglesias",
    subtitle: "Adaptive Reuse — 2nd Prize",
    desc: "Second prize in the competition for the adaptive reuse of the monastery of Santa María de Valdeiglesias. The project negotiates between the preserved fabric of a historic religious complex and a contemporary programme for collective inhabitation — working with rather than against the existing spatial hierarchies of monastic life.",
    location: "Pelayos de la Presa, ES",
    type: "Heritage / Adaptive Reuse",
    size: "—",
    budget: "—",
    status: "2nd Prize",
    photos: 6,
  },
  {
    id: "p08",
    title: "Papushevo Park",
    subtitle: "Urban Development",
    desc: "An urban development combining a public park, kindergarten, and office buildings. The park is the structuring element of the ensemble — a ground that organises collective life rather than filling residual space between built volumes.",
    location: "Russia",
    type: "Urban / Mixed Use",
    size: "—",
    budget: "—",
    status: "—",
    photos: 6,
  },
  {
    id: "p07",
    title: "Casa de Aperos",
    subtitle: "Collective Housing",
    desc: "A collective housing project in Eivissa working with the existing agricultural typology of the island — the tool shed or farm annex — as a model for shared domestic organisation in a dense Mediterranean context. The vernacular is not quoted but inhabited.",
    location: "Eivissa, ES",
    type: "Housing",
    size: "—",
    budget: "—",
    status: "—",
    photos: 5,
  },
  {
    id: "p06",
    title: "Cárcel Abierta",
    subtitle: "Adaptive Reuse",
    desc: "Adaptive reuse of a prison in Chile. The project addresses the conversion of a site of confinement into a structure for collective life — working through the existing spatial order of the penitentiary as an architectural argument about openness and enclosure.",
    location: "Chile",
    type: "Heritage / Adaptive Reuse",
    size: "—",
    budget: "—",
    status: "—",
    photos: 5,
  },
  {
    id: "p05",
    title: "Amchit Fire Proving Grounds",
    subtitle: "Ephemeral Station",
    desc: "A temporary firefighter training station in Amchit, Lebanon — designed to transform into a public park for children once its operational phase is complete. A single structure serving two sequential programmes, using material and landscape logic to negotiate the transition between them.",
    location: "Amchit, Lebanon",
    type: "Public / Ephemeral",
    size: "—",
    budget: "—",
    status: "—",
    photos: 5,
  },
  {
    id: "p04",
    title: "Dancing House",
    subtitle: "Adaptive Reuse & Coliving",
    desc: "A collaborative adaptive project for a traditional house in Beit Mery. The existing structure is adapted for a coliving situation with communal activities, and the garden is populated with a series of follies that extend the collective life of the house into the landscape.",
    location: "Beit Mery, Lebanon",
    type: "Residential / Coliving",
    size: "—",
    budget: "—",
    status: "—",
    photos: 6,
  },
  {
    id: "p03",
    title: "RAZ House",
    subtitle: "Interior Design",
    desc: "Interior design for a two-floor apartment. The project works at the scale of the domestic interior — material sequence, threshold, and the spatial relationship between shared and private life across two levels.",
    location: "—",
    type: "Interior Design",
    size: "Duplex — 2 floors",
    budget: "—",
    status: "—",
    photos: 5,
  },
  {
    id: "p02",
    title: "Baglietto Pavilion",
    subtitle: "Competition — Honourable Mention",
    desc: "Competition entry for the Baglietto Pavilion, receiving an honourable mention. A proposal exploring temporary structure, public presence, and the architecture of gathering — a single gesture that is simultaneously enclosure and threshold.",
    location: "—",
    type: "Pavilion / Competition",
    size: "—",
    budget: "—",
    status: "Honourable Mention",
    photos: 4,
  },
  {
    id: "p01",
    title: "KWL — Beirut River",
    subtitle: "Competition — 1st Prize",
    desc: "First prize in the KWL competition. The project reframes the infrastructure of the Beirut River as a site of meeting — proposing that the engineered channel, rather than dividing, can become the basis for a new form of urban public space. Infrastructure as meeting place.",
    location: "Beirut, Lebanon",
    type: "Infrastructure / Public Space",
    size: "—",
    budget: "—",
    status: "1st Prize",
    photos: 6,
  },

];
