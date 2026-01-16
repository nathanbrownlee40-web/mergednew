/* =====================================================
   TOP DAILY TIPS – CLEAN STABLE APP.JS (NO TRACKER)
   ===================================================== */

console.log("Top Daily Tips – clean build loaded");

/* ---------- STATE ---------- */
const state = {
  data: [],
  filtered: []
};

/* ---------- DOM ---------- */
const tbl = document.querySelector("#tbl tbody");
const q = document.querySelector("#q");
const leagueSel = document.querySelector("#league");
const pickSel = document.querySelector("#pick");
const dfrom = document.querySelector("#dfrom");
const dto = document.querySelector("#dto");

/* ---------- LOAD DATA ---------- */
/* If you already load CSV/JSON elsewhere, keep it.
   This is SAFE fallback so the app never blanks. */

function loadData() {
  // Dummy safe data – replace with your real loader if needed
  state.data = state.data || [];
  state.filtered = [...state.data];
  renderTable();
}

/* ---------- FILTERS ---------- */
function applyFilters() {
  const text = q?.value?.toLowerCase() || "";
  const league = leagueSel?.value || "";
  const pick = pickSel?.value || "";

  state.filtered = state.data.filter(r => {
    if (text && !JSON.stringify(r).toLowerCase().includes(text)) return false;
    if (league && r.League !== league) return false;
    if (pick && r.Pick !== pick) return false;
    return true;
  });

  renderTable();
}

/* ---------- TABLE RENDER ---------- */
function renderTable() {
  if (!tbl) return;
  tbl.innerHTML = "";

  if (!state.filtered.length) {
    tbl.innerHTML = `<tr><td colspan="10" style="opacity:.6">No results</td></tr>`;
    return;
  }

  state.filtered.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.Date || ""}</td>
      <td>${r.League || ""}</td>
      <td>${r.Home || ""} vs ${r.Away || ""}</td>
      <td>${r.Pick || ""}</td>
      <td>${r.Odds || ""}</td>
    `;
    tbl.appendChild(tr);
  });
}

/* ---------- EVENTS ---------- */
[q, leagueSel, pickSel, dfrom, dto].forEach(el => {
  if (el) el.addEventListener("input", applyFilters);
});

/* ---------- BOOT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  applyFilters();
});
/* =========================
   TOP DAILY TIPS – CLEAN
   No tracker, no stats
   ========================= */

const state = {
  data: [],
  filtered: []
};

/* ---- SAMPLE DATA (SAFE DEFAULT) ---- */
function loadData() {
  state.data = [
    {
      date: "2026-01-16",
      league: "Eredivisie",
      home: "PSV",
      away: "Excelsior",
      pick: "Over 2.5",
      odds: 2.00,
      probability: 72
    },
    {
      date: "2026-01-16",
      league: "Premier League",
      home: "Arsenal",
      away: "Brighton",
      pick: "BTTS Yes",
      odds: 1.85,
      probability: 68
    }
  ];

  state.filtered = [...state.data];
}

/* ---- RENDER TABLE ---- */
function renderTable() {
  const tbody = document.querySelector("#tbl tbody");
  const thead = document.querySelector("#tbl thead");

  thead.innerHTML = `
    <tr>
      <th>Date</th>
      <th>League</th>
      <th>Match</th>
      <th>Pick</th>
      <th>Odds</th>
      <th>Probability</th>
    </tr>
  `;

  tbody.innerHTML = "";

  if (state.filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;opacity:.6">
          No tips available
        </td>
      </tr>
    `;
    return;
  }

  state.filtered.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.date}</td>
      <td>${r.league}</td>
      <td>${r.home} vs ${r.away}</td>
      <td>${r.pick}</td>
      <td>${r.odds.toFixed(2)}</td>
      <td>${r.pro
