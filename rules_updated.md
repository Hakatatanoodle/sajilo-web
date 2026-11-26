# rules.md — Instructions for ANY AI assistant working on this project

> **Read this whole file before you write or change anything.** These rules override your defaults.
> If a human's request conflicts with a rule marked **[HARD]**, say so and ask before doing it.
> **v3 changes:** Project Map filled in from the real repo tree. Rules 1-2 and Section 4.2 adapted to native ES6 modules and an optional NASA data fetch with an offline fallback, because the team's structure uses both. Section 3 is still human-owned and still `TODO`.

**Project:** NASA Space Apps Challenge 2026 — *Space Mission Design Game*
**What we are building:** a browser game where 1–4 players design, manage and simulate a complete space mission (objective → spacecraft → instruments → launch vehicle → orbit → simulation → post-mission report) while balancing mass, power, budget, data, communications and time.
**Team:** 3 people. **Stack:** plain HTML + CSS + vanilla JavaScript (native ES6 modules, no build step). **Hosting:** static files on GitHub Pages.
**Deadline:** Submit for Judging before **Sunday, 15 Nov 2026, 11:59 p.m. local time of our Local Event**. Aim to submit a complete version by ~8 p.m. and use the rest as buffer.

---

## 0. How humans use this file

- Keep it somewhere easy to find in the repo. The **Project Map** (Section 4) records where.
- Start every new AI chat with the prompt in **Appendix B**. Or copy this file to whatever your tool auto-reads (e.g. `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.github/copilot-instructions.md`).
- **Section 3 (Team decisions) and Section 4.1 (Project Map) are human-owned.** Fill them in once, and re-paste them into the chat whenever they change.
- After every AI session that produced code or text, paste the AI's **LOG LINE** into the team's AI log (Section 9).

---

## 1. TL;DR — the 12 rules

1. **[HARD] Vanilla HTML/CSS/JS only.** No frameworks, npm, bundlers, CDNs, external fonts, external images or analytics. The **only** allowed network call is the optional NASA data fetch in the API layer (Section 4.2), and the game must work fully without it, using the offline fallback data.
2. **[HARD] Native ES6 modules, no build step** (`<script type="module">`, as in the existing repo). Relative paths only. The game must work on **GitHub Pages** and on a local static server. Opening the page by double-clicking (`file://`) is **not supported**, because browsers block modules there.
3. **[HARD] Never invent facts or numbers.** Every number in the data layer carries a `src`. If it isn't in our sources, label it `SIMPLIFIED_FOR_GAMEPLAY`. Never present a guess as real NASA data.
4. **[HARD] Do not invent or change the game concept.** The team decides it (Section 3). You implement, review, debug and explain. If the concept is unclear, ask.
5. **[HARD] Never assume, invent, rename, move or delete files or folders.** Use the **Project Map** (Section 4.1). If the map is empty or you can't see the repo, ask where the code belongs.
6. **Separation of concerns:** engine = pure logic (no DOM), UI = rendering only (no game math), content = all player-visible text, data = all numbers.
7. **Every failure teaches.** Each failed check returns *why* it failed, *what to change*, and a *source or "simplified" tag*. No bare "You lose".
8. **Deterministic simulation.** Same design + same seed = same result. Use a seeded RNG, never bare `Math.random()`.
9. **Beginner-friendly and accessible.** Plain English, units on every number, works at 360 px wide and with keyboard only.
10. **[HARD] No NASA logos or branding, no copyrighted assets, no real people or faces, English only.**
11. **[HARD] Disclose AI use** in the file header and with a LOG LINE for every change you make (Section 9).
12. **Small, complete, working changes.** No half-written files, no "…rest unchanged". Simple beats clever. We have about 37 hours.

---

## 2. Project context (what the judges see)

Judging is 1–5 on five criteria. Every decision should help at least one of them:

| Criterion | What it means for code and content |
|---|---|
| **Impact** | Students rarely see a *whole* mission as one system. The game must run in a browser with no install, and be playable by beginners, solo or in a team. |
| **Creativity** | Avoid a generic "pick parts, press launch" game. The team's hook (Section 3) must be visible in the first minute. |
| **Validity** | Numbers are grounded in real sources or honestly labeled as simplified. The game has **no bugs** on the main path. A smaller game that works beats an ambitious one that breaks. |
| **Relevance** | NASA data/frameworks must be a **core mechanic, not decoration**. They must visibly drive rules, thresholds and feedback. |
| **Presentation** | Judges grade the demo *and* the full project. Clear UI, a fast "first 3 minutes", and a readable post-mission report. |

**Award categories we are aiming at:** Best Mission Concept, Best Use of Science, Best Storytelling, Most Inspirational. Winning any of them is a long shot, so reliability and clarity come first.

**What the challenge asks for** (from the challenge text, *paraphrased*):
- Define a mission objective and requirements, design a spacecraft, pick instruments, choose launch vehicle and orbit.
- Manage six resources: **mass, power, budget, data, communications, time**.
- Check that spacecraft mass and orbit are compatible with the chosen launch vehicle.
- Simulate the mission, score it, and **explain why it succeeded or failed**.
- Support solo play and teams of up to four with different roles.
- Make trade-offs real: there is rarely one perfect solution, and every decision has a consequence.

---

## 3. Team decisions (HUMAN-OWNED — AI must not fill these in)

> AI: if a task depends on a field marked `TODO`, **ask the human**. Do not guess or invent.

| Decision | Value |
|---|---|
| Team name | `TODO` |
| Local Event + time zone | `TODO` |
| Game title | `TODO` |
| Core hook (one sentence, what makes this game different) | `TODO` |
| Mission scenarios (names + objectives) | `TODO` |
| Team-mode roles (1–4) and what each owns | `TODO` |
| Scoring weights (science, margins, budget, teamwork…) | `TODO` — stored in the data layer, never hardcoded in logic |
| Difficulty levels | `TODO` |
| Feature freeze (date/time) | `TODO` (suggested: Sun 12:00) |
| Repo URL / live GitHub Pages URL | `TODO` |

**Possible anchors from our NASA sources.** These are *options*, not decisions. AI must **not use them until a human ticks the box**.

- [ ] Roles map to NASA's four mission segments: **Launch, Space, Ground, User** (SE webinar, slide 8).
- [ ] Game phases follow NASA's six steps: **Identify Need & Goals → Define Concept → Define Requirements → Design → Build & Verify → Implement** (SE webinar, slide 10).
- [ ] A "design maturity / readiness" score based on the JPL CML checklist logic (Section 5, rows 22–27).
- [ ] The post-mission report compares the player's design to real missions (PUNCH, PILOT, Dawn, Mars Moon Sampler, BioNutrients-2, CubeSat missions).
- [ ] Incompatible choices are *greyed out with an explanation*, following the NASA "Learning Game About Telescopes" pattern (objective → compatible instruments → launch → results matched to real missions).

---

## 4. Project structure, layers and ownership

> **File and folder names are NOT fixed in this document.** The people building the project choose them. This file only describes the *layers* (the job each piece of code does). Where each layer actually lives is recorded in the **Project Map** below.

### 4.1 Project Map (HUMAN-OWNED — fill in once the structure exists)

| Layer | What it contains | Actual path(s) in this repo | Owner |
|---|---|---|---|
| **Main page / markup** | The HTML page(s) | `index.html` | B |
| **Styles** | CSS | `css/variables.css` (colors, fonts), `css/base.css` (reset, layout), `css/components.css` (buttons, cards, HUD, modals), `css/pages/dashboard.css`, `css/pages/simulation.css` | B |
| **Data layer** | All numbers: components, instruments, launchers, orbits, thresholds, scoring weights, each with `src` | **Not decided.** Candidates: `js/api/mockData.js` or `data/sample-dataset.json`. Ask A/B which file holds the mission numbers. | A (structure), C (values) |
| **Content layer** | ALL player-visible text: tutorial, tooltips, glossary, scenario text, lessons | **Missing from the tree.** Ask A/B to add a content file. Until then, no player-visible text goes into engine or UI files. | C |
| **Engine layer** | Pure logic: totals, margins, compatibility checks, simulation, scoring, report building | `js/core/engine.js` (logic, math), `js/core/state.js` (shared state) | A |
| **UI layer** | Rendering, dashboard, event handlers (calls the engine, never computes game math) | `js/ui/domElements.js` (cached selectors), `js/ui/renderer.js` (draws state to HTML/Canvas), `js/ui/controls.js` (event listeners) | B |
| **Entry / bootstrap** | Wires everything together on page load | `js/main.js`, plus `js/config.js` (constants, feature flags) | B |
| **NASA data / API layer** | Optional live NASA fetch and parsing, plus offline fallback | `js/api/nasaService.js` (fetch and parse), `js/api/mockData.js` (offline fallback) | A |
| **Script load order** | How files load | `index.html` loads `js/main.js` as a module. `main.js` imports the rest, so there is no manual tag order. | none |
| **Global namespace** | Single global object, if any | None. Use ES module `import`/`export`. Do not create globals. | none |
| **README** | What it is, how to play, live link, NASA resources used, AI disclosure | `README.md` | C |
| **References list** | Every external resource used: code, text, images, fonts, data | **Not in the tree.** Proposed: a section inside `README.md`. Ask before creating anything. | C |
| **AI log** | One line per AI-assisted change | **Not in the tree.** Proposed: a section inside `README.md`, or a shared doc. Ask. | C |
| **Assets and repo files** | Media and repo housekeeping | `assets/images/`, `assets/icons/`, `assets/audio/`, `.gitignore`. Every asset file must be listed in the references list. | B |

**Mapping notes from the real tree (AI: respect these):**
- `js/core/engine.js` is described as holding a "render/update loop". Keep the **game math** there and the **DOM drawing** in `js/ui/renderer.js`. The loop may call the UI through a callback, but the engine never touches the DOM (Rule 6).
- `js/config.js` holds constants and flags. It must **never** hold secrets or private API keys, because everything shipped here is public.
- The tree has no content file and no references or AI-log file yet. Raise this with A/B. Do not create them yourself.

**Rules about the map and the file structure:**
- **Use the exact paths from the map or from the existing repo.** Copy names character for character when writing `<script src>`, links or comments.
- **Do not create, rename, move, delete or reorganize files or folders** unless a human tells you to. If you think a new file is needed, say so as *"proposed new file: …"* and ask first.
- **If the map is empty** and you can't see the repo, don't guess. Ask: *"Which file holds the [layer]?"* If the human pastes a folder tree, treat it as the map.
- **If the real structure doesn't separate the layers into different files** (for example, one big script), keep the separation *inside* the code with clearly marked sections, and don't restructure it.
- **If the real structure differs from this document's wording, the real structure wins.** Adapt the rules to it and don't ask the team to change it.
- If a global namespace already exists, use it. If none exists, **ask** before introducing one, and don't create stray globals.

### 4.2 Hard technical constraints (apply whatever the files are called)
- Everything is static. Use **relative paths only**. No server code, no accounts, no database.
- The page loads one entry module with `<script type="module" src="...">` (path from the map). Other files are pulled in with `import`, using relative paths that include the `.js` extension. No bundler, no npm. Test locally with a static server (e.g. VS Code Live Server or `python3 -m http.server`), never `file://`.
- Game numbers (components, instruments, launchers, orbits, thresholds, weights) are **JavaScript objects exported from a module**. JSON in the data folder may be loaded with `fetch()` only for non-critical sample data and **must have a JS fallback**, so a failed fetch never breaks the game.
- **Live NASA data is optional.** The only external request allowed comes from the API layer, to a public NASA endpoint. It must: use `try/catch` with a short timeout, fall back to the offline data, never block gameplay, show a visible label ("Live NASA data" vs "Offline sample"), be cited in the references list, and use no private keys (a public demo key only, if any). To earn Relevance, live data should feed a mechanic, not decorate.
- `localStorage` is optional and must be wrapped in `try/catch`. The game must work with storage blocked.
- **Team mode = hot-seat on one device** with a shared mission state. No networking or real-time multiplayer.
- No `alert()`, `confirm()`, `prompt()`, auto-playing audio, pop-ups or trackers.

### 4.3 Ownership by layer (proposed; the map's Owner column wins)

| Person | Proposed layers |
|---|---|
| **A — Engine** | Engine layer; structure of the data layer |
| **B — UI** | Main page, styles, UI layer, entry |
| **C — Content/Story** | Content layer; values and sources in the data layer; README, references list, AI log |

If you need a change in a layer you weren't assigned, **don't edit it.** Put a block at the top of your answer:
`REQUEST(A→B): <what you need and why>`.

---

## 5. Data and fact integrity (this protects our Validity and Relevance scores)

### 5.1 Rules
- Every item in the data layer has `src` and `verified`:
  - `verified: true` → the number is stated in one of **our uploaded sources** (Appendix A). `src` names the source and page/slide/section.
  - `verified: false` → `src: "SIMPLIFIED_FOR_GAMEPLAY"` with a short `note`. The **UI must show a small "simplified" badge** for these.
- **Never** fabricate real-world specs (a real rocket's payload, a real instrument's mass, etc.). If you recall a number from memory, mark it `verified:false`, `src:"UNVERIFIED_MEMORY"`, and tell the human so they can check it.
- **Our uploaded sources contain no power budgets, data rates, link budgets or component prices.** Those values are `SIMPLIFIED_FOR_GAMEPLAY` unless a human adds a source.
- **Paraphrase** source text. Quote at most a short phrase, and always cite it.
- Never mark `verified:true` because a number "seems right".

### 5.2 Item schema
```js
{
  id: "cubesat_3u_mass_limit",
  name: "3U CubeSat dry-mass limit",
  value: 4.0,
  unit: "kg",
  src: "NASA CubeSat 101, App. C.6 acceptance checklists (pp. 79-83)",
  verified: true,
  note: "Mass limit per the 3U acceptance checklist."
}
```

### 5.3 Verified facts we can use (from our uploaded sources)

**NASA CubeSat Launch Initiative — *CubeSat 101* (Oct 2017)**

| # | Fact | Where |
|---|---|---|
| 1 | A "small satellite" is generally under 300 kg. | p. 4 |
| 2 | 1U = ~10 cm cube, ~1–1.33 kg. Other sizes: 1.5U, 2U, 3U, 6U, 12U. 3U ≈ 10×10×34 cm. | p. 4, Fig. 2 |
| 3 | A 3U dispenser holds up to 3U total (any combination). A 6U is roughly two 3Us side by side. | pp. 5–6 |
| 4 | Mass limits: 1U < 1.33 kg · 1.5U < 2.00 kg · 2U < 2.66 kg · 3U < 4.00 kg. | App. C.6, pp. 79–83 |
| 5 | Protrusions from the CubeSat body: up to 6.5 mm. | p. 16 |
| 6 | NASA CSLI covers launch costs up to **$300,000**, "typically enough to launch a 3U into LEO". The developer pays for build, testing, ground station, operations and travel. | p. 11 |
| 7 | Budgets should include a reserve of **at least 10%**. | p. 13 |
| 8 | A CubeSat can be built in as little as 9 months; typically 18–24 months. It is delivered to the launch provider 4 weeks to 6 months before launch. | p. 9 |
| 9 | Phase durations: Concept 1–6 mo · Funding 1–12 · Merit/feasibility reviews 1–2 · Design 1–6 · Proposal 3–4 · Selection/manifesting 1–36 · Mission coordination 9–18 · Licensing 4–6 · Flight documentation 10–12 · Ground station 2–12 · Fabrication & testing 2–12 · Readiness review ½ day · Dispenser integration 1–2 days · Launch 1 day · **Operations up to 20 years**. | pp. 9–10, TOC |
| 10 | Ride options ("mission models"): NASA-procured launch vehicle, ORS rideshare, NRO rideshare, commercial launch via broker, ISS deployment. ISS deployment typically happens 1–3 months after arrival at the station. | Ch. 3, pp. 31–38 |
| 11 | The launch date does not move for a late CubeSat. The rocket leaves without it. | p. 28 |
| 12 | Final mass outside the launch provider's analyzed tolerance can get a CubeSat removed from the manifest. Early mass estimates should carry generous margins. | p. 56 |
| 13 | A radio (RF) license is needed to transmit; an imager may need a remote-sensing license. Without licenses the CubeSat does not fly. | pp. 20–21, 52 |
| 14 | A ground station needs at least a radio and an antenna. "Launching with an inadequate ground station is a mission killer." | p. 22 |
| 15 | CubeSat beacons are commonly in the 437 MHz (70 cm) band. NOAA weather satellites transmit near 140 MHz (2 m). | p. 23 |
| 16 | Verification testing typically includes vibration and thermal-vacuum, sometimes shock and EMI/EMC, plus Day-In-The-Life (DITL). Changing the CubeSat after verification forces re-testing. | pp. 24, 59–62 |
| 17 | The attitude control system (ADCS) is critical, e.g. for pointing solar panels at the Sun or an imager at Earth. | p. 17 |
| 18 | Design advice: keep it simple; propulsion makes launch providers nervous; pyrotechnics are prohibited; prefer parts with flight heritage; prefer UL-listed batteries; constrain deployables with (doubled) burn wires; don't design to the envelope limit. | p. 16 |
| 19 | About half of CSLI missions do science (mostly space weather and Earth science); 66% do technology development or demonstration. | p. 3 |
| 20 | Avoid high-melting-point materials (tantalum, titanium, tungsten); they may survive re-entry and create liability. | p. 54 |
| 21 | Mission integrators coordinate schedule, documents and verification between developer and launch provider. | Ch. 2.7, p. 19 |

**JPL — *Space Mission Concept Development Using Concept Maturity Levels* (Wessen et al., 2013)**

| # | Fact | Where |
|---|---|---|
| 22 | CML scale: 1 Cocktail Napkin · 2 Initial Feasibility · 3 Trade Space · 4 Point Design · 5 Baseline Concept · 6 Integrated Concept · 7 Preliminary Implementation Baseline · 8 PDR · 9 CDR. | §II |
| 23 | CMLs 2–4 are iterative: teams loop from point design back to trade-space exploration. Skipping trade-space work led to concepts with less science return and less efficient designs. | §II, Fig. 1 |
| 24 | CML 4 checklist margins: spacecraft dry mass ≥ 35% · power ≥ 35% · energy ≥ 35% · flight-software CPU & memory ≥ 100% · telecom ≥ 3 dB (deep space) / ≥ 6 dB (proximity links). Some margins may be relaxed at later reviews. | §V, Fig. 8b |
| 25 | A concept counts as mature when **≥ 80%** of checklist items are complete. But 90% complete while missing the Science Traceability Matrix, Level 1 requirements or Master Equipment List is still not robust. | §V |
| 26 | The checklist measures **completeness, not quality**, applies no weighting, and **self-assessment tends to be too optimistic**. | §V |
| 27 | CML 1 covers: science objective, unique mission characteristics, approximate launch timeframe, target cost class. | §V |
| 28 | Mission cost classes: Explorer, Discovery, New Frontiers, Flagship. | §VI |
| 29 | "Science partials" = how science return changes as a function of a mission parameter (mass, data volume, orbital period…). | §II |

**NASA SE webinar — *Design and Develop Science Missions* (J. Levri, Mar 2025)**

| # | Fact | Where |
|---|---|---|
| 30 | Science mission disciplines: Earth science, heliophysics, planetary science, astrophysics. | slide 5 |
| 31 | Four segments: Launch · Space · Ground · User. | slide 8 |
| 32 | Six steps: Identify Need & Goals → Define Concept → Define Requirements → Design → Build & Verify → Implement. | slide 10 |
| 33 | The Concept of Operations is time-sequenced and drives requirements and architecture. | slide 13 |
| 34 | "Begin with the end in mind": derive requirements from the data/product you need, and **plan how each requirement will be verified** (e.g., "< 250 g container is verified by weighing"). | slides 15–19 |
| 35 | Example missions: PUNCH (4 small satellites, LEO, 3D observations of the Sun's corona) · PILOT (34 satellites, two orbits, magnetosphere plasma) · Dawn (Vesta and Ceres) · Mars Moon Sampler · SLS · Artemis · BioNutrients-2 (ISS experiment). | slides 11–24 |

**Challenge resources (inspiration/validation tools, not dependencies):** GMAT (orbit/trajectory analysis), NASA Mission Viz, NASA Mission Design Lab (MDL) study levels, "A Learning Game About Telescopes", 2023 "Visualize a Space Mission Using VR" challenge, CSA digital games. If a number is taken from any of these, cite it. **Do not embed external tools** (Rule 1).

---

## 6. Simulation and engine standards

### 6.1 Units (fixed, never mix)
| Resource | Unit |
|---|---|
| Mass | kg |
| Power / Energy | W / Wh |
| Budget | one currency unit chosen in the data layer's header (e.g., USD millions). Do not change. |
| Data | Mbit (generated) and Mbit/day (downlink capacity) |
| Comms | kbps, contact minutes per day, link margin in dB |
| Time | months (development + operations) |
| Altitude | km |

### 6.2 Margin convention (project decision)
`margin % = (capacity − predicted use) ÷ predicted use × 100`.
State this in the UI tooltip. NASA projects define margin in several ways, so don't claim ours is "the" NASA formula.

### 6.3 Minimum checks (from the challenge text)
Each returns the standard result object (6.4):
1. **Launch compatibility:** spacecraft mass (with margin) ≤ launcher payload capacity **for the chosen orbit**.
2. **Power:** generation ≥ consumption in sunlight, and battery covers eclipse (simplified is fine).
3. **Budget:** total cost + reserve (≥ 10%, source row 7) ≤ budget.
4. **Data vs comms:** data generated per day ≤ downlink capacity per day.
5. **Time:** development + operations fits the scenario deadline and orbit lifetime.
6. **Science objective:** the instrument set actually satisfies the scenario's objective.
7. **Margin thresholds** from the data layer (default to the CML 4 values, source row 24).

Two severity tiers, following the CML idea that "80% complete" is not enough if critical items are missing:
- `critical` — a failure here **fails the mission** (e.g., doesn't fit on the rocket).
- `warning` — reduces score and appears in the report but doesn't fail the mission alone.

### 6.4 Standard result object
```js
{
  id: "power_margin",
  category: "power",          // mass|power|budget|data|comms|time|launch|science
  severity: "critical",       // critical|warning|info
  pass: false,
  value: 12,                  // what the design has
  threshold: 35,              // what is needed
  unit: "%",
  message: "Power margin is 12%, below the 35% target.",
  lesson: "Designs usually grow as they mature, so NASA asks for a buffer.",
  fix: "Add a solar panel, remove a power-hungry instrument, or use a bigger battery.",
  src: "NASA/JPL CML 4 checklist (Wessen et al. 2013, Fig. 8b)"
}
```
If the team has already defined its own result shape, **follow the existing one** and make sure it still carries message, lesson, fix and source.

### 6.5 Engine rules
- The engine layer is **pure**: inputs in, results out. No DOM access, no reading the page.
- Same inputs + same seed = same output. Random events use a small seeded PRNG (e.g., mulberry32) defined once.
- The engine never throws to the UI. Bad input returns a failed check with a clear message.
- Scoring reads its weights from the data layer. **Never hardcode weights.**
- The **post-mission report is built from the check results.** It must show the outcome, score breakdown, the top 3 reasons for success/failure, margins for all six resources, *what to change next*, and (if adopted in Section 3) the closest real missions.
- Players must be able to **edit and re-simulate** without reloading.
- Every design decision has a visible consequence (e.g., more instruments → more science **and** more mass, power, data and cost).

---

## 7. UI, UX, education and accessibility

- **First 3 minutes matter.** Judges open the link cold. Provide:
  - a visible **"Quick Demo"** that loads a ready-made design, and
  - a **"Try a failing design"** path that ends in a report explaining the failure.
- **Dashboard** always shows the six resources with current value, limit, margin and pass/warn/fail status.
- Use **text and icons plus color**. Never color alone (colorblind-safe).
- **Define terms at first use** (orbit altitude, payload capacity, power budget, data downlink, margin…) in one plain sentence via tooltip or glossary. All player-visible text lives in the content layer.
- Teach *why*, not just *what*: every warning links to the lesson from the result object.
- Show a small **"simplified"** badge on any `verified:false` number.
- Responsive from **360 px** wide to desktop. Touch targets ≥ 44 px. Base font ≥ 16 px.
- Keyboard-playable, visible focus outlines, semantic HTML, labels on every input, `aria-live="polite"` for dashboard updates, text contrast ≥ 4.5:1, respect `prefers-reduced-motion`.
- Player-entered text (team names, etc.) must use `textContent`, **never** `innerHTML`.
- Spacecraft and orbit visuals: inline **SVG/CSS drawn in code**. No stock images, no AI-generated images, no NASA imagery or logos (see Section 9).
- Never show unfinished placeholder text (`TODO`, lorem ipsum) in the shipped build.

---

## 8. Code standards and workflow

**Code**
- Readable over clever. Small functions with plain-English comments, because teammates have mixed experience.
- Use `const`/`let`, `===`, `addEventListener` (no inline `onclick`). No `eval`. No dead code. No console errors or warnings.
- Don't add libraries "to save time". Rule 1 is absolute.
- Don't rename, move or reformat files you weren't asked to touch. Don't refactor beyond the task.
- Provide **complete working files or clearly marked full replacements**, with the file's real path (from the Project Map) above every code block. Never "…rest of file unchanged".

**Git (3 people, 1 weekend)**
- Commit small and often. Message format: `[A] engine: add power margin check`.
- `git pull --rebase` before every push. **Never force-push or rewrite history.**
- Don't commit generated junk, large binaries or secrets (there should be none).

**Priority order when time is short:** (1) it works → (2) numbers are honest → (3) explanations are clear → (4) UI polish → (5) extras.
Cut list if we fall behind: random events, difficulty levels, leaderboard, save/share via URL. **Never cut** the report's "why" explanations.
**Out of scope:** online multiplayer, accounts, 3D, GMAT integration.

---

## 9. AI disclosure, provenance and copyright **[HARD]**

NASA requires us to disclose AI use ("SI" on the form). Code and data must be acknowledged in descriptive text and metadata. AI-generated images/video need a visible watermark. Audio needs acknowledgement in text and metadata. AI must **not** be used to come up with our solution idea (Rule 4).

**Every file you create or edit gets this header (update it, don't remove it):**
```js
/* File: <real path from the Project Map>
 * Owner: <Person A/B/C>
 * AI-assisted: YES — <tool name>, <date>. Reviewed by a human: YES/NO.
 * Sources used: <list, or "none">
 */
```
(Use `<!-- -->` in HTML and `/* */` in CSS.)

**At the end of every answer that creates or changes anything, output a LOG LINE** for the human to paste into the team's AI log:
```
YYYY-MM-DD HH:MM | <person> | <AI tool> | <files> | <what was generated> | human-reviewed: yes/no
```

**Copyright and branding**
- **No NASA logos, "meatball"/"worm", flags, mission patches or mission identifiers**, and nothing implying NASA endorsement. Text credit such as "Data/resources from NASA" is fine.
- No copyrighted music, images, fonts or text. Use system fonts. Anything external, even open source, must be listed in the references list. Every file in the assets folder (images, icons, audio) must be made by us or be public domain/CC0, and be listed too. Audio never autoplays.
- **No real people, faces or voices, and nothing depicting anyone under 18** anywhere in the game, README or demo.
- English only in the project and all linked materials.
- Prefer not to generate images with AI at all. If one is ever used, it needs a visible watermark and a log entry.

---

## 10. Submission constraints the code must respect

- The **final project link must be public** with no login, password or registration, and must load on a judge's normal network. Use GitHub Pages and test in a private window.
- Humans also need: a **7-slide deck or ≤ 30-second video** (hosted externally, public), a README, a complete references list, and a list of exactly which NASA resources were used. At least one NASA resource is required for a Global Award.
- **AI's job here:** keep the README accurate (what it is, how to play in 3 steps, live link, NASA resources used, AI disclosure) and keep the references list in sync with what the code actually uses.

---

## 11. Definition of done (check before every push; AI should run through it before replying)

- [ ] Works on GitHub Pages (tested in a private window) **and** on a local static server. Relative paths only.
- [ ] No console errors. The Network tab shows **no requests to other sites** except the optional NASA fetch, and the game still works with that request blocked.
- [ ] Works at 360 px and on desktop, and with keyboard only.
- [ ] Solo flow and team flow both complete: design → simulate → report → edit → re-simulate.
- [ ] Both a **passing** and a **failing** mission are reachable, and the failure explains itself.
- [ ] Same inputs + same seed gives the same result.
- [ ] Every number has `src`/`verified`. Simplified values are badged in the UI.
- [ ] All player text is in the content layer. No `TODO`/lorem text visible.
- [ ] File headers updated, LOG LINE produced, references list updated.
- [ ] No NASA branding, no copyrighted assets, no people/faces.
- [ ] No files or folders were created, renamed, moved or deleted without a human asking.

---

## 12. How the AI should respond

1. **Confirm briefly** that you've read this file, then wait for the task if none was given.
2. **If something is unclear or undecided, ask one clear question** rather than assuming. This includes file locations. List any assumptions you did make.
3. **State which file(s) you're changing and who owns them** (per the Project Map). If it's not the requester's layer, output a `REQUEST(…)` instead of editing.
4. **Prefer the smallest change** that works. Don't expand scope. Flag scope creep.
5. **Be honest about uncertainty.** If you are not sure a fact is true, say so and mark it `verified:false`. Never bluff a NASA number.
6. **Explain in plain English**, briefly, especially anything beginners will read in the game.
7. End with the **LOG LINE** and a one-line "how to test this".

---

## Appendix A — Source documents (the only `verified:true` sources unless a human adds more)

| Short name | Document |
|---|---|
| **NASA_CUBESAT101** | NASA CubeSat Launch Initiative, *CubeSat 101: Basic Concepts and Processes for First-Time CubeSat Developers*, Oct 2017 (`nasa_csli_cubesat_101_508.pdf`) |
| **JPL_CML** | Wessen, Borden, Ziemer, Kwok, *Space Mission Concept Development Using Concept Maturity Levels*, JPL/Caltech, 2013 (`13-3547_A1b.pdf`) |
| **NASA_SE_WEBINAR** | J. Levri, *Design and Develop Science Missions*, NASA "Access to Space for All" Systems Engineering Webinar Series, 26 Mar 2025 (`250323-design-and-develop-science-mission.pdf`) |
| **SPACEAPPS_CHALLENGE** | NASA Space Apps 2026 challenge text and Resources tab |
| **SPACEAPPS_RULES** | Project Submission Guide and Judging & Awards Guide (13 Nov 2026) |

## Appendix B — Paste this at the start of every AI chat

```
You are helping on a 3-person NASA Space Apps hackathon project: a browser-based
Space Mission Design Game built with vanilla HTML/CSS/JS (no frameworks, no CDNs,
no build step, native ES6 modules, runs on GitHub Pages and a local static server).
Read the rules below and follow them exactly. Reply with ONE line confirming you
understand, then wait for my task. I am Person [A/B/C].
File and folder names are NOT fixed: use the Project Map below (or the repo itself),
never assume a path, and never create, rename, move or delete files unless I ask.
If something is undecided or unclear, ask me instead of guessing. Never invent
numbers. Never change the game concept. End every answer with an AI log line and a
one-line test step.

[paste the full contents of rules.md here, plus the current Section 3 table and
Section 4.1 Project Map]
```
