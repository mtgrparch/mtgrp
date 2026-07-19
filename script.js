// ─────────────────────────────────────────────────────────────────────────────
//  MTGRP — script.js
//  Parallax image grid with smooth inertia scrolling, project modals,
//  about modal, and work list modal. All data lives in PROJECTS below.
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. ABOUT DATA ────────────────────────────────────────────────────────────
const PARTNERS = [
  {
    name: "Andrew Georges",
    role: "Co-Founder",
    photo: "photos/ANDREW.webp",
    bio: "Andrew studied architecture at the Lebanese American University (BArch) before completing the Master of Advanced Studies in Collective Housing (MCH) at Escuela Tecnica Superior de Arquitectura de Madrid and ETH Zurich. His research, culminating in the thesis Unframing Collective Housing Through Ideology, informs a practice deeply engaged with the politics of space, modular systems, and architectural ghosts. Operating from Madrid, his work bridges these theoretical frameworks with the mechanics of circularity and metabolism. Recently, Andrew was awarded for the Europan-winning Ruckhalde masterplan in St. Gallen.",
  },
  {
    name: "Charbel Abou Chacra",
    role: "Co-Founder",
    photo: "photos/CHARBEL.webp",
    bio: "Charbel studied architecture at Université Saint-Esprit de Kaslik (BArch, MArch) before completing a Master of Science in Architecture and Urbanism at Politecnico di Milano. His research moves through the multisensory terrain of architecture and the collective memory held in a place. Charbel operates in Milan, and has been part of studios working on civic-scale buildings in Amsterdam, Milan, the G.C.C. and the Levant. He was awarded first prize in the KWL National Competition in 2019 for the Beirut River regeneration, and recently, has served as a guest tutor at the MIAW – Milan International Architecture Workshop at Politecnico di Milano.",
  },
  {
    name: "Nahi El Khoury",
    role: "Co-Founder",
    photo: "photos/NAHI.webp",
    bio: "​Nahi studied architecture at Université Saint-Esprit de Kaslik (BArch, MArch). His research circles the phenomenology of building, how architecture is felt under the hand before it is read, and the question of how architecture should be reflecting actions and projecting them, an interest that pulls him toward adaptive reuse and the slow transformation of existing structures rather than their erasure. Professionally, Nahi works on some of the region’s largest developments among them Diriyah, NEOM, and Expo 2030 Riyadh at the scale where computational, formally ambitious design has to survive its translation into something built. He dedicates a significant portion of his practice to research-driven and independent projects, driven by a desire to explore unanswered questions within the discipline.",
  },
  {
    name: "Joe Chamata",
    role: "Co-Founder",
    photo: "photos/JOE.webp",
    bio: "Joe studied architecture at Université Saint-Esprit de Kaslik (BArch, MArch). His academic research investigates fabrication, robotic production, and mass customization with a specific focus on architectural assemblies and joinery. This academic focus translated directly into applied prototyping as part of the Beirut Makers collective; where he was granted funding in 2022 to build a physical prototype for the group's exhibition at the Beirut Art Center. Professionally, Joe operates between Beirut and the Gulf, applying his technical and research-driven background to large-scale developments across Saudi Arabia and the UAE. His experience includes the development of Qiddiya city, where he leads teams and coordinates multidisciplinary sub-consultants.",
  },
];


// ── COLLABORATORS ─────────────────────────────────────────────────────────────
const COLLABORATORS = {
  architects: [
    "Jorge Sanchez Bajo, Bettina Kagelmacher, Roman Schober, Andres Solano, Elie El Khoury, Jaques Zekian, Mike Chaiban, Valerie Saab, Christina Karam, Ryuhei Ismael Kagawa, Jorge Andres Rodriguez Angel, Andrey Bader",
  ],
  offices: [
    "tebt+, esteoeste, superunion, b.noma, studio street 9",
  ],
};

function buildAboutHTML() {
  const partnersHTML = PARTNERS.map(p => `
    <div>
      <div class="partner-photo">
        <img src="${p.photo}" alt="${p.name}"
             onerror="this.parentElement.innerHTML='Photo'"
             loading="lazy" decoding="async">
      </div>
      <div class="partner-name">${p.name}</div>
      <div class="partner-role">${p.role}</div>
      <p class="partner-bio">${p.bio}</p>
    </div>`).join('');

  const collabsHTML = (COLLABORATORS.architects.length || COLLABORATORS.offices.length) ? `
    <div class="about-collabs">
      <div class="about-collabs-col">
        <div class="collabs-label">Collaborators and Friends</div>
        ${COLLABORATORS.architects.map(n => `<div class="collab-entry">${n}</div>`).join('')}
      </div>
      <div class="about-collabs-col">
        <div class="collabs-label">Offices of our Friends</div>
        ${COLLABORATORS.offices.map(n => `<div class="collab-entry">${n}</div>`).join('')}
      </div>
    </div>` : '';

  return `
    <div class="modal-title about-title">MTGRP</div>
    <p class="about-statement">
      MTGRP is metagroupe is a collaborative architecture practice working at the intersection of thermal conditions, open-ended use, and collective space. We pursue a holistic approach to material expression — buildings as proposals about how life is organised and shared.
      <br><br>
      Our work spans housing, adaptive reuse, urban design, and installation. Across these scales we return to the same questions: how a building manages energy and climate as a social act; how programme can remain underdetermined; how the shared spaces of a building carry as much weight as the private ones.
      <br><br>
      We are interested in metabolism and circularity not as technical positions but as ideological ones — in what it means to build with and within existing material and social structures rather than against them.
    </p>

    <div class="about-partners">${partnersHTML}</div>

    <table class="about-contact-table" style="margin-bottom: 8px;">
      <tr><td>Work</td><td><span id="open-work-list" style="color:#0033FF;cursor:pointer;">All projects &rarr;</span></td></tr>
    </table>

    <div class="about-list-section">
      <div class="collabs-label">Publications</div>
      <a href="https://www.europan-europe.eu/en/exchanges/die-den-gletscher-bewohnen" target="_blank" rel="noopener" class="about-list-item">
        <span>Die Den Gletscher Bewohnen</span>
        <span class="about-list-meta">Europan 18 Portrait &mdash; 2026</span>
      </a>
      <a href="https://unbuiltarch.org/en/the-walled-garden-2/" target="_blank" rel="noopener" class="about-list-item">
        <span>Walled Garden</span>
        <span class="about-list-meta">unbuiltarch Journal &mdash; 2023</span>
      </a>
      <a href="https://issuu.com/mch_master/docs/untagged_final_online_" target="_blank" rel="noopener" class="about-list-item">
        <span>#Untagged - Issue 1: A Year in Collective Housing</span>
        <span class="about-list-meta">#Untagged &mdash; 2023</span>
      </a>
      <a href="https://beirutartcenter.org/event/beirut-makers-x-beirut-art-center/" target="_blank" rel="noopener" class="about-list-item">
        <span>Pliee - Beirut Makers Exhibition</span>
        <span class="about-list-meta">Beirut Art Center &mdash; 2022</span>
      </a>
      <a href="https://www.google.com/amp/s/beirut-today.com/2019/03/07/student-transform-beirut-river-park/amp/" target="_blank" rel="noopener" class="about-list-item">
        <span>Beirut River Project - Interview</span>
        <span class="about-list-meta">Beirut Today &mdash; 2019</span>
      </a>
      <a href="https://www.lebanontraveler.com/en/magazine/keep-walking-lebanon/" target="_blank" rel="noopener" class="about-list-item">
        <span>KWL - Bringing Visions to Life</span>
        <span class="about-list-meta">Lebanon Traveler &mdash; 2019</span>
      </a>
    </div>

    <div class="about-list-section" style="margin-bottom: 32px;">
      <div class="collabs-label">Academic & Workshops</div>
      <div class="about-list-item">
        <span>MIAW – Milan International Architecture Workshop</span>
        <span class="about-list-meta">Politecnico di Milano</span>
      </div>
      <div class="about-list-item">
        <span>Housing in Beirut</span>
        <span class="about-list-meta">Introductory Session - MCH</span>
      </div>
     <div class="about-list-item">
        <span>Archival Research - Modern Architecture in Beirut</span>
        <span class="about-list-meta">Arab Center for Architecture</span>
      </div>
     <div class="about-list-item">
        <span>Architectural Graphics Workshop</span>
        <span class="about-list-meta">Design X - Lebanese American University</span>
      </div>
    </div>

    ${collabsHTML}

    <table class="about-contact-table" style="margin-top: 48px;">
      <tr><td>Email</td><td><a href="mailto:studio@mtgrp.xyz" style="color:#0033FF;text-decoration:none">studio@mtgrp.xyz</a></td></tr>
      <tr><td>Instagram</td><td><a href="https://www.instagram.com/metagroupe/" target="_blank" style="color:#0033FF;text-decoration:none">@metagroupe</a></td></tr>
      <tr><td>Offices</td><td>Beirut &nbsp;·&nbsp; Madrid &nbsp;·&nbsp; Milan</td></tr>
      <tr><td>Est.</td><td>2018</td></tr>
    </table>`;
}

// ── 2. PROJECT REGISTRY ───────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "p14",
    title: "A Well-Tempered House",
    subtitle: "Family Housing",
    desc: "A house perched on a steep hillside in Ghazir, Lebanon. Deep thermal walls form the structural and spatial logic of the house, while a series of terraces negotiate the steep slope of the site. The house is designed to be passively cooled in summer and passively heated in winter, with a focus on natural ventilation, solar orientation, and thermal mass.",
    info: [
      { label: "Location", value: "Ghazir, LB" },
      { label: "Type",     value: "Housing" },
      { label: "Status",   value: "Ongoing" },
      { label: "Avg Hot",   value: "23°C" },
      { label: "Avg Cold",   value: "13°C" },
      { label: "Elevation",   value: "380m" },
      { label: "Coordinates",   value: "34°N36°E" },
      { label: "Team",     value: ["Andrew Georges"] },
    ],
    photos: 12,
    preview: 1,
  },
  {
    id: "p13",
    title: "A Home in the Sun",
    subtitle: "Home for Seniors",
    desc: "An elderly care facility organized around the natural circadian rhythm to mitigate the disorientation associated with dementia. The architecture establishes a clear structural dichotomy: a dense, in-situ concrete communal core consolidates daytime collective programs, while prefabricated timber wings hold the private, quiet residential households. Designed as a replicable prototype, the modular kit of parts adapts to two distinct topographies. In Lysá nad Labem, the households are compacted into a three-storey pinwheel forming an urban edge, whereas in Milovice, the same units unfold into a two-storey horizontal arrangement following the gentle slope of the land. The project relies on passive climate strategies, utilizing high thermal mass and cross-ventilation, while the landscape functions as an active therapeutic instrument calibrated to provide temporal and olfactory orientation.",
    info: [
      { label: "Location",      value: "Lysá nad Labem, CZ" },
      { label: "Type",          value: "Housing" },
      { label: "Budget",        value: "212,227,500 Kč" },
      { label: "Status",        value: "Competition" },
      { label: "Avg Hot",   value: "17°C" },
      { label: "Avg Cold",   value: "3°C" },
      { label: "Elevation",   value: "183m" },
      { label: "Coordinates",   value: "50°N15°E" },
      { label: "Team",          value: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Jorge Sanchez Bajo"] },
      { label: "Collaborators", value: ["tebt+"] },
    ],
    photos: 10,
    preview: 7,
  },
  {
    id: "p12",
    title: "Die Den Gletscher Bewohnen",
    subtitle: "Europan — Winner",
    desc: "Winning entry for the Europan competition. The project addresses the geological threshold between molasse and moraine, proposing a model of dwelling that is responsive to the terrain, water, and social change. The glacier is not backdrop but partner — a slow, material presence that shapes the logic of the building.",
    info: [
      { label: "Location",      value: "St. Gallen, CH" },
      { label: "Type",          value: "Competition" },
      { label: "Size",          value: "12.4 ha" },
      { label: "Status",        value: "1st Prize" },
      { label: "Avg Hot",   value: "14°C" },
      { label: "Avg Cold",   value: "2°C" },
      { label: "Elevation",   value: "684m" },
      { label: "Coordinates",   value: "47°N09°E" },
      { label: "Team",          value: ["Andrew Georges", "Jorge Sanchez Bajo", "Bettina Kagelmacher", "Roman Schober"] },
      { label: "Collaborators", value: ["tebt+"] },
    ],
    photos: 7,
    preview: 3,
  },
  {
    id: "p10",
    title: "Holcim Visitor Center",
    subtitle: "Competition Entry",
    desc: "Competition entry for the Holcim Visitor Center. Positioned as a precise interface between industrial production and the public, the proposal engages with the material logic of cement. The building acts as a transparent, functional framework rather than a conventional shell, performing its own material origin while physically manifesting the circular economy and flexible, future-proof architectural design.",
    info: [
      { label: "Location",      value: "Siggenthal, CH" },
      { label: "Type",          value: "Cultural" },
      { label: "Status",        value: "Competition" },
      { label: "Avg Hot",   value: "16°C" },
      { label: "Avg Cold",   value: "3°C" },
      { label: "Elevation",   value: "358m" },
      { label: "Coordinates",   value: "48°N08°E" },
      { label: "Team",          value: ["Andrew Georges", "Jorge Sanchez Bajo", "Bettina Kagelmacher", "Roman Schober"] },
      { label: "Collaborators", value: ["tebt+"] },
    ],
    photos: 11,
    preview: 3,
  },
  {
    id: "p09",
    title: "Santa María de Valdeiglesias",
    subtitle: "Adaptive Reuse — 2nd Prize",
    desc: "Second prize in the competition for the adaptive reuse of the monastery of Santa María de Valdeiglesias. The project negotiates between the preserved fabric of a historic religious complex and a contemporary programme for collective inhabitation — working with rather than against the existing spatial hierarchies of monastic life.",
    info: [
      { label: "Location", value: "Pelayos de la Presa, ES" },
      { label: "Type",     value: "Heritage / Adaptive Reuse" },
      { label: "Status",   value: "2nd Prize" },
      { label: "Avg Hot",   value: "21°C" },
      { label: "Avg Cold",   value: "8°C" },
      { label: "Elevation",   value: "570m" },
      { label: "Coordinates",   value: "40°N04°W" },
      { label: "Team",     value: ["Andrew Georges", "Nahi El Khoury", "Joe Chamata"] },
    ],
    photos: 5,
    preview: 3,
  },
  {
    id: "p08",
    title: "Papushevo Park",
    subtitle: "Urban Development",
    desc: "An urban development combining a public park, kindergarten, and office buildings. The park is the structuring element of the ensemble, a ground that organises collective life rather than filling residual space between built volumes.",
    info: [
      { label: "Location", value: "Papushevo, RU" },
      { label: "Type",     value: "Urban / Mixed Use" },
      { label: "Avg Hot",   value: "15°C" },
      { label: "Avg Cold",   value: "-3°C" },
      { label: "Elevation",   value: "170m" },
      { label: "Coordinates",   value: "56°N37°E" },
      { label: "Team",     value: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata", "Mike Chaiban"] },
    ],
    photos: 7,
    preview: 3,
  },
  {
    id: "p07",
    title: "Casa de Aperos",
    subtitle: "Collective Housing",
    desc: "A proposal for a self-sufficient commune in Eivissa grounded in principles of degrowth and scarcity. Conceived as an adaptable infrastructure stripped to its basic conditions, the project utilizes a proximity modular system constructed from salvaged local demolition materials. Learning from the vernacular Casa Payesa, it adapts traditional mass and passive climate strategies for collective living. The architecture actively engages the user in sustainable practices, functioning alongside an operational manual to reduce traditional energy consumption.",
    info: [
      { label: "Location",      value: "Eivissa, ES" },
      { label: "Type",          value: "Housing" },
      { label: "Avg Hot",   value: "22°C" },
      { label: "Avg Cold",   value: "14°C" },
      { label: "Elevation",   value: "81m" },
      { label: "Coordinates",   value: "39°N01°E" },
      { label: "Team",          value: ["Andrew Georges", "Jorge Sanchez Bajo", "Andres Solano"] },
      { label: "Collaborators", value: ["tebt+", "esteoeste estudio"] },
    ],
    photos: 10,
    preview: 5,
  },
  {
    id: "p06b",
    title: "Three Brothers",
    subtitle: "Three Pavilions",
    desc: "Three pavilions for three brothers on the coast of Amchit, Lebanon. Each pavilion is distinct — a singular response to a shared site — while the three together constitute a small domestic landscape on the water's edge.",
    info: [
      { label: "Location", value: "Amchit, Lebanon" },
      { label: "Type",     value: "Residential / Pavilion" },
      { label: "Team",     value: ["Joseph Hourany", "Andrew Georges"] },
    ],
    photos: 7,
    preview: 1,
  },
  {
    id: "p06c",
    title: "Salt Nest",
    subtitle: "Adaptive Reuse",
    desc: "Perched on a rugged Sicilian cliff, the Salt Nest breathes new life into an abandoned stone Customs House, transforming a historic relic into an immersive visitor retreat. Embracing principles of material circularity and structural minimalism, the design introduces translucent, geometric roof volumes clad in crystallized salt panels grown sustainably from the surrounding Mediterranean Sea. Inside, the reimagined interior unfolds vertically, hosting a coffee shop, reading nooks, and a layered museum sequence that culminates in a delicate rooftop observation deck suspended between the earth and the sky. Ultimately, the intervention engages in a quiet dialogue with the raw coastal landscape and the ghosts of its past, offering visitors a poetic connection to light, terrain, and the natural elements.",
    info: [
      { label: "Location", value: "Punta Bianca, IT" },
      { label: "Type",     value: "Visitor Center / Pavilion" },
      { label: "Team",     value: ["Joe Chamata", "Christina Karam", "Andrey Bader"] },
    ],
    photos: 5,
    preview: 2,
  },
  {
    id: "p06",
    title: "Cárcel Abierta",
    subtitle: "Adaptive Reuse",
    desc: "Adaptive reuse of a prison in Chile. The project addresses the conversion of a site of confinement into a structure for collective life — working through the existing spatial order of the penitentiary as an architectural argument about openness and enclosure.",
    info: [
      { label: "Location",      value: "Talca, CL" },
      { label: "Type",          value: "Heritage / Adaptive Reuse" },
      { label: "Team",          value: ["Marwan Zouein", "Andrew Georges", "Nahi El Khoury", "Beatriz Sendin Jimenez"] },
      { label: "Collaborators", value: ["[casaleganitos]", "n'undo"] },
    ],
    photos: 6,
    preview: 2,
  },
  {
    id: "p05b",
    title: "Above All, a Shared Resource",
    subtitle: "Ephemeral Installation",
    desc: "Pliée: A blank piece of paper offers infinite experimentation and as structuralists we began with a fold. Pliée is a wooden structure inspired by the mechanism of simple origami. The folded structure is meant to define its own parameters and create functional spaces on the roof through shading mechanisms while the roof's connection to the sky is defined, intentional, and purposeful while remaining flexible and mobile.",
    info: [
      { label: "Location",      value: "Beirut, LB" },
      { label: "Type",          value: "Public / Ephemeral" },
      { label: "Budget",        value: "600$" },
      { label: "Team",          value: ["Joe Chamata", "Mike Chaiban", "Christina Karam"] },
      { label: "Collaborators", value: ["Bits to Atoms"] },
    ],
    photos: 5,
    preview: 1,
  },
  {
    id: "p05",
    title: "Amchit Fire Proving Grounds",
    subtitle: "Ephemeral Station",
    desc: "A temporary firefighter training station in Amchit, Lebanon — designed to transform into a public park for children once its operational phase is complete. A single structure serving two sequential programmes, using material logic to negotiate the transition between them.",
    info: [
      { label: "Location", value: "Amchit, LB" },
      { label: "Type",     value: "Public / Ephemeral" },
      { label: "Team",     value: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"] },
    ],
    photos: 0,
    preview: 0,
  },
  {
    id: "p04",
    title: "Dancing House",
    subtitle: "Adaptive Reuse & Coliving",
    desc: "A collaborative adaptive project for a traditional house in Beit Mery. The existing structure is adapted for a coliving situation with communal activities, and the garden is populated with a series of follies that extend the collective life of the house into the landscape.",
    info: [
      { label: "Location", value: "Beit Mery, LB" },
      { label: "Type",     value: "Residential / Coliving" },
      { label: "Team",     value: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata", "Mike Chaiban"] },
    ],
    photos: 0,
    preview: 0,
  },
  {
    id: "p03",
    title: "RAZ House",
    subtitle: "Interior Design",
    desc: "Interior design for a duplex apartment. A wooden box organized life accross two floors.",
    info: [
      { label: "Location", value: "Aley, LB" },
      { label: "Type",     value: "Interior Design" },
      { label: "Size",     value: "Duplex — 2 floors" },
      { label: "Team",     value: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata", "Mike Chaiban"] },
    ],
    photos: 0,
    preview: 0,
  },
  {
    id: "p03b",
    title: "AM House",
    subtitle: "Interior Design",
    desc: "Interior design for a penthouse. A steel platform forms a mezanine organizing life underneath it.",
    info: [
      { label: "Location", value: "Nahr Ibrahim, LB" },
      { label: "Type",     value: "Interior Design" },
      { label: "Size",     value: "Penthouse" },
      { label: "Team",     value: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata", "Jaques Zekian"] },
    ],
    photos: 0,
    preview: 0,
  },
  {
    id: "p03c",
    title: "GOE Office Extension",
    subtitle: "Interior Design",
    desc: "xxxxxxxxxxx",
    info: [
      { label: "Location", value: "Beit Chaar, LB" },
      { label: "Type",     value: "Interior Design" },
      { label: "Team",     value: ["Andrew Georges", "Charbel Abou Chacra"] },
    ],
    photos: 0,
    preview: 0,
  },
  {
    id: "p02",
    title: "Baglietto Pavilion",
    subtitle: "Competition — Honourable Mention",
    desc: "Competition entry for the Baglietto Pavilion, receiving an honourable mention. A proposal exploring temporary structure, public presence, and the architecture of gathering — a single gesture that is simultaneously enclosure and threshold.",
    info: [
      { label: "Type",   value: "Pavilion / Competition" },
      { label: "Status", value: "Honourable Mention" },
      { label: "Team",   value: ["Nahi El Khoury", "Valerie Saab"] },
    ],
    photos: 0,
    preview: 0,
  },
  {
    id: "p01",
    title: "KWL — Beirut River",
    subtitle: "Competition — 1st Prize",
    desc: "First prize in the KWL competition. The project reframes the infrastructure of the Beirut River as a site of meeting — proposing that the engineered channel, rather than dividing, can become the basis for a new form of urban public space. Infrastructure as meeting place.",
    info: [
      { label: "Location", value: "Beirut, LB" },
      { label: "Type",     value: "Infrastructure / Public Space" },
      { label: "Status",   value: "1st Prize" },
      { label: "Team",     value: ["Charbel Abou Chacra", "Nahi El Khoury", "Kay Bardawil", "Charbel Corbani", "Michelle Norenzian"] },
    ],
    photos: 0,
    preview: 0,
  },
];

// ── 3. WORK LIST MODAL HTML ───────────────────────────────────────────────────
function buildWorkListHTML() {
  let rows = PROJECTS.map((p, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `
      <tr class="work-row" data-id="${p.id}" style="cursor:pointer">
        <td style="color:#ccc;font-family:'Karla',sans-serif;font-size:0.7rem;
                   letter-spacing:0.08em;padding-top:3px;width:36px">${num}</td>
        <td style="font-size:1.1rem;padding-right:24px">${p.title}
          ${p.subtitle ? `<span style="font-style:italic;color:#888;font-size:0.85em"> — ${p.subtitle}</span>` : ''}
        </td>
        <td style="font-style:italic;font-size:0.85rem;color:#888;
                   text-align:right;white-space:nowrap">${(p.info.find ? p.info.find(r => r.label === "Location") : null)?.value || "—"}</td>
      </tr>`;
  }).join('');

  return `
    <h2>Work — ${PROJECTS.length} projects</h2>
    <table class="modal-data-table" style="margin-bottom:0">
      <tbody>${rows}</tbody>
    </table>`;
}

// ── 4. PROJECT MODAL HTML ─────────────────────────────────────────────────────
function buildProjectHTML(p) {
  // Build info rows from p.info array — each entry is { label, value }
  // Special values: 'team' and 'collab' render as lists automatically
  const rowsHTML = (p.info || []).map(({ label, value }) => {
    let cell;
    if (label === 'Team' || label === 'Collaborators') {
      const items = Array.isArray(value) ? value : [value];
      cell = items.length
        ? `<ul class="modal-team-list">${items.map(n => `<li>${n}</li>`).join('')}</ul>`
        : '—';
    } else {
      cell = value || '—';
    }
    return `<tr><td>${label}</td><td>${cell}</td></tr>`;
  }).join('');

  let imagesHTML = '';
  if (p.photos > 0) {
    const handleImgError = "this.onerror=null; this.src=this.src.replace('.webp', '.gif');";
    const imgs = Array.from({ length: p.photos }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      return `<img src="photos/${p.id}-${num}.webp" onerror="${handleImgError}" loading="lazy" decoding="async" alt="${p.title} ${num}">`;
    }).join('');
    imagesHTML = `<div class="modal-images">${imgs}</div>`;
  }

  return `
    <div class="modal-title">${p.title}</div>
    ${p.subtitle ? `<span class="modal-subtitle">${p.subtitle}</span>` : ''}
    <div class="modal-body-cols">
      <table class="modal-data-table">${rowsHTML}</table>
      <p class="modal-desc">${p.desc}</p>
    </div>
    ${imagesHTML}`;
}

// ── 5. BUILD PARALLAX GRID ────────────────────────────────────────────────────
// Use screen.width for mobile detection — more reliable than innerWidth at load time
const isMobile   = Math.min(window.screen.width, window.screen.height) <= 768;
const COL_COUNT  = isMobile ? 1 : 3;
const SPEEDS     = isMobile ? [1.0] : [0.7, 1.0, 0.55];
const MARGINS    = isMobile ? [0]   : [0, -200, -110];

// Build a flat list of PREVIEW tiles for the grid — only projects with photos
function buildTileList() {
  const tiles = [];
  PROJECTS.forEach(p => {
    if (p.photos <= 0 || (p.preview ?? 3) <= 0) return; // hidden from grid; accessible via work list
    const count = Math.min(p.preview ?? 3, p.photos);
    for (let i = 1; i <= count; i++) {
      const num = String(i).padStart(2, '0');
      tiles.push({ src: `photos/${p.id}-${num}.webp`, projectId: p.id, label: p.title });
    }
  });
  // shuffle so projects interleave across columns
  return tiles.sort(() => Math.random() - 0.5);
}

function buildGrid() {
  const grid = document.getElementById('parallax-grid');
  const tiles = buildTileList();
  const columns = Array.from({ length: COL_COUNT }, () => []);

  tiles.forEach((tile, i) => columns[i % COL_COUNT].push(tile));

  columns.forEach((colTiles, ci) => {
    const col = document.createElement('div');
    col.className = 'parallax-col';
    col.dataset.speed = SPEEDS[ci];
    col.style.marginTop = `${MARGINS[ci]}px`;

    // Add fallback for grid images + decoding="async"
    // Grid tiles loop infinitely, so lazy-loading forces a main-thread decode each
    // time an image re-enters the viewport → periodic scroll hitches. There are only
    // a handful of preview tiles, so load them eagerly and decode off the main thread.
    const handleImgError = "this.onerror=null; this.src=this.src.replace('.webp', '.gif');";
    const tileHTML = colTiles.map(tile =>
      `<img src="${tile.src}" onerror="${handleImgError}" data-id="${tile.projectId}" alt="${tile.label}" loading="eager" decoding="async">`
    ).join('');

    // Duplicate for infinite loop
    col.innerHTML = tileHTML + tileHTML;
    grid.appendChild(col);
  });

  attachClickListeners();
}

// ── 6. MODAL SYSTEM ───────────────────────────────────────────────────────────
const modalContainer = document.getElementById('modal-container');
const modalContent   = document.getElementById('modal-content');
const closeBtn       = document.getElementById('close-modal');

function openModal(html) {
  velocity = 0;
  modalContent.innerHTML = html;
  modalContainer.classList.remove('hidden');

  // Work list rows → open project modal
  document.querySelectorAll('.work-row').forEach(row => {
    row.addEventListener('click', () => {
      const p = PROJECTS.find(x => x.id === row.dataset.id);
      if (p) openModal(buildProjectHTML(p));
    });
    row.addEventListener('mouseenter', () => row.style.color = '#0033FF');
    row.addEventListener('mouseleave', () => row.style.color = '');
  });

  // About modal → "All projects" link
  const workListLink = document.getElementById('open-work-list');
  if (workListLink) {
    workListLink.addEventListener('click', () => openModal(buildWorkListHTML()));
  }
}

closeBtn.addEventListener('click', () => modalContainer.classList.add('hidden'));
modalContainer.addEventListener('click', e => {
  if (e.target === modalContainer) modalContainer.classList.add('hidden');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modalContainer.classList.add('hidden');
});

document.getElementById('about-btn').addEventListener('click', () => openModal(buildAboutHTML()));


function attachClickListeners() {
  document.querySelectorAll('.parallax-col img').forEach(el => {
    el.addEventListener('click', () => {
      const p = PROJECTS.find(x => x.id === el.dataset.id);
      if (p) openModal(buildProjectHTML(p));
    });
  });
}

// ── 7. SMOOTH INERTIA SCROLL ──────────────────────────────────────────────────
let virtualScrollY = 0;
let velocity       = 0;
const FRICTION     = 0.88;   // momentum decay per frame — lower = stops faster
const WHEEL_SCALE  = 0.7;    // wheel sensitivity
const TOUCH_SCALE  = 1.6;    // touch drag sensitivity

// Mouse wheel — add to velocity rather than position directly
window.addEventListener('wheel', e => {
  if (!modalContainer.classList.contains('hidden')) return;
  e.preventDefault();
  velocity += e.deltaY * WHEEL_SCALE;
  if (velocity >  40) velocity =  40;  // cap so fast flicks don't overshoot
  if (velocity < -40) velocity = -40;
}, { passive: false });

// Touch
let touchStartY  = 0;
let lastTouchY   = 0;
let touchVelocity = 0;

function onTouchStart(e) {
  touchStartY   = e.touches[0].clientY;
  lastTouchY    = touchStartY;
  touchVelocity = 0;
}

function onTouchMove(e) {
  if (!modalContainer.classList.contains('hidden')) return;
  e.preventDefault();
  const currentY = e.touches[0].clientY;
  const delta    = lastTouchY - currentY;
  touchVelocity  = delta * TOUCH_SCALE;
  velocity       = touchVelocity;
  lastTouchY     = currentY;
}

function onTouchEnd() {
  // hand off touch momentum to the velocity system so it coasts naturally
  velocity = touchVelocity;
}

// Cache column elements AND their half-height. Column heights are driven by CSS
// (fixed vh image heights), so they're stable regardless of image load state —
// measure once here instead of forcing a reflow via scrollHeight every frame.
let cachedCols = [];

function measureCols() {
  for (const col of cachedCols) col.halfHeight = col.el.scrollHeight / 2;
}

function initScrollCache() {
  cachedCols = Array.from(document.querySelectorAll('.parallax-col')).map(col => ({
    el:    col,
    speed: parseFloat(col.dataset.speed),
    halfHeight: 0,
  }));
  measureCols();
}

// Heights depend on viewport (vh units) and on images finishing layout — re-measure
// on resize and once everything has loaded, but never inside the animation loop.
window.addEventListener('resize', measureCols);
window.addEventListener('load', measureCols);

function updateParallax() {
  velocity       *= FRICTION;
  virtualScrollY += velocity;
  if (Math.abs(velocity) < 0.05) velocity = 0;

  for (const col of cachedCols) {
    const halfHeight = col.halfHeight;
    if (halfHeight <= 0) continue;
    let y = (virtualScrollY * col.speed) % halfHeight;
    if (y < 0) y += halfHeight;
    // Sub-pixel translate3d — rounding to whole pixels made the slower columns
    // advance in visible integer steps (micro-stutter) at low speeds.
    col.el.style.transform = `translate3d(0, ${(-y).toFixed(2)}px, 0)`;
  }

  updateHud();

  requestAnimationFrame(updateParallax);
}


// ── 7b. DATA HUD — cursor telemetry ──────────────────────────────────────────
//  Hovering a grid tile summons a trailing instrument readout of the project's
//  data (coordinates, altitude, temperatures). Each line follows the cursor
//  with a different inertia so the stack stretches like a streamer; text
//  decodes in with an ASCII scramble; the coordinate arc-minutes are driven
//  by the mouse position.
//  On mobile there is no pointer: the tile crossing the screen centre is read
//  instead, the stack anchors to the left edge, lines drag with the scroll
//  velocity, and the arc-minutes pan with the scroll position.
const HUD_ENABLED = isMobile || window.matchMedia('(hover: hover)').matches;
const HUD_GLYPHS  = '░▒▓#%/<>+=*';
const HUD_LINES   = [
  { key: 'title',  lerp: 0.32,  dx: 24, dy: -34, cls: 'hud-title' },
  { key: 'meta',   lerp: 0.24,  dx: 24, dy: -16 },
  { key: 'coords', lerp: 0.16,  dx: 24, dy: 20  },
  { key: 'alt',    lerp: 0.12,  dx: 24, dy: 36  },
  { key: 'temp',   lerp: 0.085, dx: 24, dy: 52  },
];
const HUD_SCRAMBLE_MS = 450;   // decode duration per line
const HUD_STAGGER_MS  = 70;    // decode delay between lines
const HUD_ALT_MS      = 900;   // altitude count-up duration

let hudEl = null, hudCross = null, hudLineEls = [];
let hudMx = -1e4, hudMy = -1e4;
let hudProject = null, hudData = null, hudEnterAt = 0;
let hudFlip = 0;  // 0 = readout right of cursor, 1 = flipped left (lerped)
let hudImgEl = null;                       // tile currently under the cursor
let hudSampleCtx = null, hudSampleTick = 0;
let hudOnLight = false, hudSamplingBroken = false;

function initDataHud() {
  if (!HUD_ENABLED) return;
  hudEl = document.createElement('div');
  hudEl.id = 'data-hud';

  if (!isMobile) {
    hudCross = document.createElement('div');
    hudCross.className = 'hud-line hud-cross';
    hudCross.textContent = '+';
    hudCross._x = 0; hudCross._y = 0;
    hudEl.appendChild(hudCross);
  }

  hudLineEls = HUD_LINES.map(def => {
    const el = document.createElement('div');
    el.className = 'hud-line' + (def.cls ? ' ' + def.cls : '');
    el._x = 0; el._y = 0;
    hudEl.appendChild(el);
    return el;
  });

  document.body.appendChild(hudEl);

  const sampleCanvas = document.createElement('canvas');
  sampleCanvas.width = 16; sampleCanvas.height = 10;
  hudSampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });

  if (!isMobile) {
    window.addEventListener('mousemove', e => { hudMx = e.clientX; hudMy = e.clientY; });
    document.documentElement.addEventListener('mouseleave', () => { hudMx = -1e4; hudMy = -1e4; });
  }
}

function hudInfo(p, label) {
  const row = (p.info || []).find(r => r.label === label);
  return row ? row.value : null;
}

function hudDataFor(p) {
  const loc    = hudInfo(p, 'Location');
  const status = hudInfo(p, 'Status') || hudInfo(p, 'Type');
  const coords = hudInfo(p, 'Coordinates');                  // e.g. "34°N36°E"
  const elev   = hudInfo(p, 'Elevation');                    // e.g. "380m"
  const hot    = hudInfo(p, 'Avg Hot');
  const cold   = hudInfo(p, 'Avg Cold');
  const m      = coords ? coords.match(/(\d+)°([NS])\s*(\d+)°([EW])/) : null;
  return {
    num:   String(PROJECTS.indexOf(p) + 1).padStart(2, '0'),
    title: p.title,
    meta:  [loc, status].filter(Boolean).join(' — ') || null,
    lat:   m ? { deg: +m[1], hemi: m[2] } : null,
    lon:   m ? { deg: +m[3], hemi: m[4] } : null,
    alt:   elev ? parseInt(elev, 10) : null,
    temp:  (hot && cold) ? `T ${hot} / ${cold}` : null,
  };
}

// Arc-minutes pan with the cursor — moving across the tile pans the reading.
// On mobile the scroll position pans them instead.
function hudLiveCoords(d) {
  let mm, ss;
  if (isMobile) {
    mm = (((virtualScrollY / 7)   % 60) + 60) % 60 | 0;
    ss = (((virtualScrollY / 2.8) % 60) + 60) % 60 | 0;
  } else {
    mm = (hudMx / window.innerWidth  * 59) | 0;
    ss = (hudMy / window.innerHeight * 59) | 0;
  }
  return `${d.lat.deg}°${String(mm).padStart(2, '0')}′${d.lat.hemi} — ${d.lon.deg}°${String(ss).padStart(2, '0')}′${d.lon.hemi}`;
}

// Average luminance (0–255) of the image pixels beneath the readout.
// Tiles use object-fit: cover, so viewport coords are mapped back through the
// cover crop into natural-image pixels before sampling.
function hudSampleLuma(imgEl) {
  if (!imgEl || !imgEl.naturalWidth) return null;
  const rect   = imgEl.getBoundingClientRect();
  const scale  = Math.max(rect.width / imgEl.naturalWidth, rect.height / imgEl.naturalHeight);
  const offX   = rect.left + (rect.width  - imgEl.naturalWidth  * scale) / 2;
  const offY   = rect.top  + (rect.height - imgEl.naturalHeight * scale) / 2;
  // viewport region the readout occupies (flips to the left near the right
  // edge on desktop; pinned to the left edge around the centre on mobile)
  const region = isMobile
    ? { x: 8, y: window.innerHeight / 2 - 44, w: Math.min(280, window.innerWidth - 16), h: 110 }
    : { x: (hudFlip > 0.5 ? hudMx - 280 : hudMx), y: hudMy - 44, w: 280, h: 110 };
  let sx = (region.x - offX) / scale;
  let sy = (region.y - offY) / scale;
  let sw = region.w / scale;
  let sh = region.h / scale;
  sx = Math.max(0, Math.min(sx, imgEl.naturalWidth  - 1));
  sy = Math.max(0, Math.min(sy, imgEl.naturalHeight - 1));
  sw = Math.min(sw, imgEl.naturalWidth  - sx);
  sh = Math.min(sh, imgEl.naturalHeight - sy);
  if (sw < 4 || sh < 4) return null;
  hudSampleCtx.drawImage(imgEl, sx, sy, sw, sh, 0, 0, 16, 10);
  const d = hudSampleCtx.getImageData(0, 0, 16, 10).data;
  let sum = 0;
  for (let i = 0; i < d.length; i += 4) {
    sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
  }
  return sum / (d.length / 4);
}

// White text over dark imagery, MTGRP blue over light — with hysteresis so the
// colour never flickers around the threshold. Sampled every 8th frame.
function hudUpdateColor() {
  if (hudSamplingBroken || !hudProject) return;
  if (hudSampleTick++ % 8 !== 0) return;
  try {
    const luma = hudSampleLuma(hudImgEl);
    if (luma === null) return;
    if (!hudOnLight && luma > 160) hudOnLight = true;
    else if (hudOnLight && luma < 140) hudOnLight = false;
    hudEl.classList.toggle('on-light', hudOnLight);
  } catch (e) {
    // canvas tainted (cross-origin) — fall back to difference blending
    hudSamplingBroken = true;
    hudEl.classList.remove('on-light');
    hudEl.classList.add('hud-blend');
  }
}

function hudScramble(text, progress) {
  const reveal = Math.floor(progress * text.length);
  let out = text.slice(0, reveal);
  for (let i = reveal; i < text.length; i++) {
    out += text[i] === ' ' ? ' ' : HUD_GLYPHS[(Math.random() * HUD_GLYPHS.length) | 0];
  }
  return out;
}

function updateHud() {
  if (!hudEl) return;
  const now = performance.now();

  // Reading point: the cursor on desktop, the screen centre on mobile.
  const px = isMobile ? window.innerWidth  / 2 : hudMx;
  const py = isMobile ? window.innerHeight / 2 : hudMy;

  // What's under the reading point right now? (tiles drift beneath it, so this
  // is re-checked every frame rather than relying on mouseenter. On mobile,
  // probe slightly above/below centre too so the 12px gap between tiles
  // doesn't blink the readout off mid-scroll.)
  let project = null;
  if (modalContainer.classList.contains('hidden') && (isMobile || hudMx > -9999)) {
    for (const dy of (isMobile ? [0, 80, -80] : [0])) {
      const el = document.elementFromPoint(px, py + dy);
      if (el && el.tagName === 'IMG' && el.dataset.id && el.closest('.parallax-col')) {
        project  = PROJECTS.find(p => p.id === el.dataset.id) || null;
        hudImgEl = el;
        break;
      }
    }
  }

  if (project !== hudProject) {
    const fromIdle = !hudProject;
    hudProject = project;
    if (project) {
      hudData    = hudDataFor(project);
      hudEnterAt = now;
      if (fromIdle) {
        // burst out from the point of contact rather than flying in from afar
        if (hudCross) { hudCross._x = px; hudCross._y = py; }
        hudLineEls.forEach(el => { el._x = px; el._y = py; });
      }
    }
    hudEl.classList.toggle('active', !!project);
  }

  // Flip the readout to the left of the cursor near the right edge
  if (!isMobile) hudFlip += ((hudMx > window.innerWidth - 300 ? 1 : 0) - hudFlip) * 0.2;

  hudUpdateColor();

  // Crosshair rides tight to the cursor (desktop only)
  if (hudCross) {
    hudCross._x += (px - hudCross._x) * 0.55;
    hudCross._y += (py - hudCross._y) * 0.55;
    hudCross.style.transform =
      `translate3d(${hudCross._x.toFixed(1)}px, ${hudCross._y.toFixed(1)}px, 0) translate(-50%, -50%)`;
  }

  const t = now - hudEnterAt;
  const altEase = 1 - Math.pow(1 - Math.min(t / HUD_ALT_MS, 1), 3);

  HUD_LINES.forEach((def, i) => {
    const el = hudLineEls[i];

    // positions keep tracking even while faded out, so re-entry never jumps.
    // Mobile: anchored to the left edge around the screen centre, dragged by
    // the scroll velocity — slower lines lag further, fanning the stack out.
    const tx = isMobile ? 16 : hudMx + def.dx - hudFlip * def.dx * 2;
    const rawY = isMobile
      ? py + def.dy + velocity * (1 - def.lerp) * 1.6
      : hudMy + def.dy;
    const ty = Math.min(Math.max(rawY, 10), window.innerHeight - 14);
    el._x += (tx - el._x) * def.lerp;
    el._y += (ty - el._y) * def.lerp;
    el.style.transform =
      `translate3d(${el._x.toFixed(1)}px, ${el._y.toFixed(1)}px, 0) translateX(${(-100 * hudFlip).toFixed(1)}%)`;

    if (!hudProject) return;

    let text = null;
    switch (def.key) {
      case 'title':  text = `${hudData.num} — ${hudData.title}` + (((now / 530) | 0) % 2 ? ' ▌' : ''); break;
      case 'meta':   text = hudData.meta; break;
      case 'coords': text = hudData.lat ? hudLiveCoords(hudData) : null; break;
      case 'alt':    text = hudData.alt != null ? `ALT +${Math.round(altEase * hudData.alt)}M` : null; break;
      case 'temp':   text = hudData.temp; break;
    }

    el.style.visibility = text ? 'visible' : 'hidden';
    if (!text) return;

    const prog = Math.min(Math.max((t - i * HUD_STAGGER_MS) / HUD_SCRAMBLE_MS, 0), 1);
    el.textContent = prog >= 1 ? text : hudScramble(text, prog);
  });
}


// ── LIVE WEATHER ──────────────────────────────────────────────────────────────
// Open-Meteo: free, no API key needed. Updates every 10 minutes.
const WEATHER_CITIES = [
  { id: 'weather-beirut', name: 'Beirut', lat: 33.89, lon: 35.50 },
  { id: 'weather-madrid', name: 'Madrid', lat: 40.42, lon: -3.70 },
  { id: 'weather-milan',  name: 'Milan',  lat: 45.46, lon:  9.19 },
];

function weatherIcon(code) {
  if (code === 0)    return '○';
  if (code <= 2)     return '◑';
  if (code === 3)    return '●';
  if (code <= 49)    return '≋';
  if (code <= 69)    return '·';
  if (code <= 79)    return '*';
  if (code <= 86)    return '*';
  if (code <= 99)    return '⚡';
  return '';
}

async function fetchWeather() {
  WEATHER_CITIES.forEach(async city => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code&temperature_unit=celsius`;
      const res  = await fetch(url);
      const data = await res.json();
      const temp = Math.round(data.current.temperature_2m);
      const icon = weatherIcon(data.current.weather_code);
      const el   = document.getElementById(city.id);
      if (el) el.textContent = `${city.name} ${icon} ${temp}°`;
    } catch {
      // fail silently — just keeps showing city name
    }
  });
}

// ── MULTILINGUAL DESCRIPTION SLIDESHOW ───────────────────────────────────────
//  Cycles the landing description through EN → FR → ES → IT → AR → EN …
//  Cross-fade via opacity transition; Arabic switches text-direction.

const DESC_SLIDES = [
  {
    lang: 'en',
    dir: 'ltr',
    text: 'Architecture concerned with metabolism and circularity — a political approach to temperature, material expression, and collective use. We are interested in the spaces in between.',
  },
  {
    lang: 'fr',
    dir: 'ltr',
    text: 'Architecture attentive au métabolisme et à la circularité — une approche politique de la température, de l\'expression matérielle et de l\'usage collectif. Nous nous intéressons aux espaces intermédiaires.',
  },
  {
    lang: 'es',
    dir: 'ltr',
    text: 'Arquitectura concernida con el metabolismo y la circularidad — una aproximación política a la temperatura, la expresión material y el uso colectivo. Nos interesan los espacios intermedios.',
  },
  {
    lang: 'it',
    dir: 'ltr',
    text: 'Architettura che si confronta con il metabolismo e la circolarità — un approccio politico alla temperatura, all\'espressione materiale e all\'uso collettivo. Siamo interessati agli spazi intermedi.',
  },
  {
    lang: 'ar',
    dir: 'rtl',
    text: 'عمارة معنيّة بالتمثيل الحيوي والتدوير — مقاربة سياسية للحرارة، والتعبير المادي، والاستخدام الجماعي. نحن مهتمّون بالفضاءات البينيّة.',
  },
];

function initDescSlideshow() {
  const el = document.getElementById('landing-desc');
  if (!el) return;

  // Ensure smooth fade transition
  el.style.transition = 'opacity 0.6s ease';

  let current = 0;

  function showSlide(index) {
    const slide = DESC_SLIDES[index];
    // Fade out
    el.style.opacity = '0';

    setTimeout(() => {
      el.textContent  = slide.text;
      el.lang         = slide.lang;
      el.dir          = slide.dir;
      // Right-align Arabic text so it sits flush to the left edge of the panel
      el.style.textAlign = slide.dir === 'rtl' ? 'right' : 'left';
      // Fade back in
      el.style.opacity = '1';
    }, 600); // wait for fade-out to complete
  }

  setInterval(() => {
    current = (current + 1) % DESC_SLIDES.length;
    showSlide(current);
  }, 5000); // 5 seconds per slide
}


window.addEventListener('DOMContentLoaded', () => {
  buildGrid();

  const grid = document.getElementById('parallax-grid');
  grid.addEventListener('touchstart', onTouchStart, { passive: false });
  grid.addEventListener('touchmove',  onTouchMove,  { passive: false });
  grid.addEventListener('touchend',   onTouchEnd,   { passive: true  });

  initScrollCache();
  initDataHud();
  requestAnimationFrame(updateParallax);

  fetchWeather();
  setInterval(fetchWeather, 10 * 60 * 1000);

  initDescSlideshow();
});