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
    "Jorge Sanchez Bajo, Bettina Kagelmacher, Roman Schober, Andres Solano,Jaques Zekian, Mike Chaiban, Valerie Saab, Christina Karam, Ryuhei Ismael Kagawa, Jorge Andres Rodriguez Angel, Andrey Bader",
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
      <tr><td>Email</td><td><a href="mailto:metagroupearch@gmail.com" style="color:#0033FF;text-decoration:none">metagroupearch@gmail.com</a></td></tr>
      <tr><td>Instagram</td><td><a href="https://www.instagram.com/metagroupe/" target="_blank" style="color:#0033FF;text-decoration:none">@metagroupe</a></td></tr>
      <tr><td>Offices</td><td>Beirut &nbsp;·&nbsp; Madrid &nbsp;·&nbsp; Milan</td></tr>
      <tr><td>Est.</td><td>2018</td></tr>
      <tr><td>Work</td><td><span id="open-work-list" style="color:#0033FF;cursor:pointer;">All projects &rarr;</span></td></tr>
    </table>`;
}

// ── 2. PROJECT REGISTRY ───────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "p13",
    title: "A Home in the Sun",
    subtitle: "Home for Seniors",
    desc: "An elderly care facility organized around the natural circadian rhythm to mitigate the disorientation associated with dementia. The architecture establishes a clear structural dichotomy: a dense, in-situ concrete communal core consolidates daytime collective programs, while prefabricated timber wings hold the private, quiet residential households. Designed as a replicable prototype, the modular kit of parts adapts to two distinct topographies. In Lysá nad Labem, the households are compacted into a three-storey pinwheel forming an urban edge, whereas in Milovice, the same units unfold into a two-storey horizontal arrangement following the gentle slope of the land. The project relies on passive climate strategies, utilizing high thermal mass and cross-ventilation, while the landscape functions as an active therapeutic instrument calibrated to provide temporal and olfactory orientation.",
    location: "Lysá nad Labem. CZ",
    type: "Housing",
    size: "—",
    budget: "212,227,500 Kč",
    status: "Competition",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Jorge Sanchez Bajo"],
    collab: ["tebt+"],
    photos: 10,
    preview: 7,
  },
  {
    id: "p12",
    title: "Die Den Gletscher Bewohnen",
    subtitle: "Europan — Winner",
    desc: "Winning entry for the Europan competition. The project addresses the geological threshold between molasse and moraine, proposing a model of dwelling that is responsive to the terrain, water, and social change. The glacier is not backdrop but partner — a slow, material presence that shapes the logic of the building.",
    location: "St. Galen, CH",
    type: "Competition",
    size: "12.4 ha",
    budget: "—",
    status: "1st Prize",
    team: ["Andrew Georges", "Jorge Sanchez Bajo", "Bettina Kagelmacher", "Roman Schober"],
    collab: ["tebt+","Bettina Kagelmacher", "Roman Schober"],
    photos: 7,
    preview: 3,
  },
  {
    id: "p10",
    title: "Holcim Visitor Center",
    subtitle: "Competition Entry",
    desc: "Competition entry for the Holcim Visitor Center. Positioned as a precise interface between industrial production and the public, the proposal engages with the material logic of cement. The building acts as a transparent, functional framework rather than a conventional shell, performing its own material origin while physically manifesting the circular economy and flexible, future-proof architectural design.",
    location: "Siggenthal, CH",
    type: "Cultural",
    size: "—",
    budget: "—",
    status: "Competition",
    team: ["Andrew Georges", "Jorge Sanchez Bajo", "Bettina Kagelmacher", "Roman Schober"],
    collab: ["tebt+","Bettina Kagelmacher", "Roman Schober"],
    photos: 11,
    preview: 3,
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
    team: ["Andrew Georges", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 5,
    preview: 3,
  },
  {
    id: "p08",
    title: "Papushevo Park",
    subtitle: "Urban Development",
    desc: "An urban development combining a public park, kindergarten, and office buildings. The park is the structuring element of the ensemble, a ground that organises collective life rather than filling residual space between built volumes.",
    location: "Papushevo, RU",
    type: "Urban / Mixed Use",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata","Mike Chaiban"],
    collab: [],
    photos: 7,
    preview: 3,
  },
  {
    id: "p07",
    title: "Casa de Aperos",
    subtitle: "Collective Housing",
    desc: "A proposal for a self-sufficient commune in Eivissa grounded in principles of degrowth and scarcity. Conceived as an adaptable infrastructure stripped to its basic conditions, the project utilizes a proximity modular system constructed from salvaged local demolition materials. Learning from the vernacular Casa Payesa, it adapts traditional mass and passive climate strategies for collective living. The architecture actively engages the user in sustainable practices, functioning alongside an operational manual to reduce traditional energy consumption.",
    location: "Eivissa, ES",
    type: "Housing",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Jorge Sanchez Bajo", "Andres Solano"],
    collab: ["tebt+","esteoeste estudio"],
    photos: 10,
    preview: 5,
  },
  {
    id: "p06b",
    title: "Three Brothers",
    subtitle: "Three Pavilions",
    desc: "Three pavilions for three brothers on the coast of Amchit, Lebanon. Each pavilion is distinct — a singular response to a shared site — while the three together constitute a small domestic landscape on the water's edge.",
    location: "Amchit, Lebanon",
    type: "Residential / Pavilion",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Joseph Hourany","Andrew Georges"],
    collab: [],
    photos: 7,
    preview: 3,
  },
  {
    id: "p06c",
    title: "Salt Nest",
    subtitle: "Adaptive Reuse",
    desc: "Perched on a rugged Sicilian cliff, the Salt Nest breathes new life into an abandoned stone Customs House, transforming a historic relic into an immersive visitor retreat. Embracing principles of material circularity and structural minimalism, the design introduces translucent, geometric roof volumes clad in crystallized salt panels grown sustainably from the surrounding Mediterranean Sea. Inside, the reimagined interior unfolds vertically, hosting a coffee shop, reading nooks, and a layered museum sequence that culminates in a delicate rooftop observation deck suspended between the earth and the sky. Ultimately, the intervention engages in a quiet dialogue with the raw coastal landscape and the ghosts of its past, offering visitors a poetic connection to light, terrain, and the natural elements.",
    location: "Punta Bianca, IT",
    type: "Visitor Center / Pavilion",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Joe Chamata","Christina Karam","Andrey Bader"],
    collab: [],
    photos: 0,
    preview: 0,
  },
  {
    id: "p06",
    title: "Cárcel Abierta",
    subtitle: "Adaptive Reuse",
    desc: "Adaptive reuse of a prison in Chile. The project addresses the conversion of a site of confinement into a structure for collective life — working through the existing spatial order of the penitentiary as an architectural argument about openness and enclosure.",
    location: "Talca, CL",
    type: "Heritage / Adaptive Reuse",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Marwan Zouein", "Andrew Georges", "Nahi El Khoury", "Beatriz Sendin Jimenez"],
    collab: ["[casaleganitos]","n'undo"],
    photos: 6,
    preview: 2,
  },
  {
    id: "p05b",
    title: "Above All, a Shared Resource",
    subtitle: "Ephemeral Installation",
    desc: "Pliée: A blank piece of paper offers infinite experimentation and as structuralists we began with a fold. Pliée is a wooden structure inspired by the mechanism of simple origami. The folded structure is meant to define its own parameters and create functional spaces on the roof through shading mechanisms while the roof’s connection to the sky is defined, intentional, and purposeful while remaining flexible and mobile.",
    location: "Beirut, LB",
    type: "Public / Ephemeral",
    size: "—",
    budget: "600$",
    status: "—",
    team: ["Joe Chamata", "Mike Chaiban", "Christina Karam"],
    collab: ["Bits to Atoms"],
    photos: 5,   
    preview: 1,
  },
  {
    id: "p05",
    title: "Amchit Fire Proving Grounds",
    subtitle: "Ephemeral Station",
    desc: "A temporary firefighter training station in Amchit, Lebanon — designed to transform into a public park for children once its operational phase is complete. A single structure serving two sequential programmes, using material logic to negotiate the transition between them.",
    location: "Amchit, LB",
    type: "Public / Ephemeral",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 0,
    preview: 0,
  },
  {
    id: "p04",
    title: "Dancing House",
    subtitle: "Adaptive Reuse & Coliving",
    desc: "A collaborative adaptive project for a traditional house in Beit Mery. The existing structure is adapted for a coliving situation with communal activities, and the garden is populated with a series of follies that extend the collective life of the house into the landscape.",
    location: "Beit Mery, LB",
    type: "Residential / Coliving",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata","Mike Chaiban"],
    collab: [],
    photos: 0,
    preview: 0,
  },
  {
    id: "p03",
    title: "RAZ House",
    subtitle: "Interior Design",
    desc: "Interior design for a duplex apartment. A wooden box organized life accross two floors.",
    location: "Aley, LB",
    type: "Interior Design",
    size: "Duplex — 2 floors",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata", "Mike Chaiban"],
    collab: [],
    photos: 0,
    preview: 0,
  },
  {
    id: "p03b",
    title: "AM House",
    subtitle: "Interior Design",
    desc: "Interior design for a penthouse. A steel platform forms a mezanine organizing life underneath it.",
    location: "Nahr Ibrahim, LB",
    type: "Interior Design",
    size: "Penthouse",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata","Jaques Zekian"],
    collab: [],
    photos: 0,
    preview: 0,
  },
  {
    id: "p03c",
    title: "GOE Office Extension",
    subtitle: "Interior Design",
    desc: "xxxxxxxxxxx",
    location: "xxxxxxx, LB",
    type: "Interior Design",
    size: "Penthouse",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra"],
    collab: [],
    photos: 0,
    preview: 0,
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
    team: ["Nahi El Khoury", "Valerie Saab"],
    collab: [],
    photos: 0,
    preview: 0,
  },
  {
    id: "p01",
    title: "KWL — Beirut River",
    subtitle: "Competition — 1st Prize",
    desc: "First prize in the KWL competition. The project reframes the infrastructure of the Beirut River as a site of meeting — proposing that the engineered channel, rather than dividing, can become the basis for a new form of urban public space. Infrastructure as meeting place.",
    location: "Beirut, LB",
    type: "Infrastructure / Public Space",
    size: "—",
    budget: "—",
    status: "1st Prize",
    team: ["Charbel Abou Chacra", "Nahi El Khoury", "Kay Bardawil", "Charbel Corbani", "Michelle Norenzian"],
    collab: [],
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
                   text-align:right;white-space:nowrap">${p.location}</td>
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
  const teamHTML = p.team && p.team.length
    ? `<ul class="modal-team-list">${p.team.map(n => `<li>${n}</li>`).join('')}</ul>`
    : '—';
  const collabHTML = p.collab && p.collab.length
    ? `<ul class="modal-team-list">${p.collab.map(n => `<li>${n}</li>`).join('')}</ul>`
    : null;

  // All photos shown in modal (not just preview)
  let imagesHTML = '';
  if (p.photos > 0) {
    // Add fallback for modal images, and decoding="async" for smoother mobile loading
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
      <table class="modal-data-table">
        <tr><td>Location</td><td>${p.location}</td></tr>
        <tr><td>Type</td><td>${p.type}</td></tr>
        <tr><td>Size</td><td>${p.size}</td></tr>
        <tr><td>Budget</td><td>${p.budget}</td></tr>
        <tr><td>Status</td><td>${p.status}</td></tr>
        <tr><td>Team</td><td>${teamHTML}</td></tr>
        ${collabHTML ? `<tr><td>Collaborators</td><td>${collabHTML}</td></tr>` : ''}
      </table>
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
    const handleImgError = "this.onerror=null; this.src=this.src.replace('.webp', '.gif');";
    const tileHTML = colTiles.map(tile =>
      `<img src="${tile.src}" onerror="${handleImgError}" data-id="${tile.projectId}" alt="${tile.label}" loading="lazy" decoding="async">`
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
  // Drive through velocity only — col.offset accumulates in updateParallax
  velocity       = touchVelocity;
  lastTouchY     = currentY;
}

function onTouchEnd() {
  // hand off touch momentum to the velocity system so it coasts naturally
  velocity = touchVelocity;
}

let cachedCols = [];

function initScrollCache() {
  cachedCols = Array.from(document.querySelectorAll('.parallax-col')).map(col => ({
    el:         col,
    speed:      parseFloat(col.dataset.speed),
    halfHeight: col.scrollHeight / 2,
  }));
}

// Rebuild on resize so halfHeights stay accurate
window.addEventListener('resize', () => {
  clearTimeout(window._rsz);
  window._rsz = setTimeout(initScrollCache, 150);
}, { passive: true });

function updateParallax() {
  velocity       *= FRICTION;
  virtualScrollY += velocity;
  if (Math.abs(velocity) < 0.05) velocity = 0;

  for (const col of cachedCols) {
    if (col.halfHeight <= 0) continue;
    // Each column tracks its own accumulated offset — never resets, no jump.
    col.offset = (col.offset || 0) + velocity * col.speed;
    // Wrap within [0, halfHeight) continuously
    col.offset = ((col.offset % col.halfHeight) + col.halfHeight) % col.halfHeight;
    col.el.style.transform = `translate3d(0, -${col.offset.toFixed(2)}px, 0)`;
  }

  requestAnimationFrame(updateParallax);
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
  initScrollCache();

  const grid = document.getElementById('parallax-grid');
  grid.addEventListener('touchstart', onTouchStart, { passive: false });
  grid.addEventListener('touchmove',  onTouchMove,  { passive: false });
  grid.addEventListener('touchend',   onTouchEnd,   { passive: true  });

  requestAnimationFrame(updateParallax);

  fetchWeather();
  setInterval(fetchWeather, 10 * 60 * 1000);

  initDescSlideshow();
});