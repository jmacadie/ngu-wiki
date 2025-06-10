import { researchData } from './research_data.js';
import { toHMS, formatPcnt } from './utils.js';

const state = {
  tree: 'Growth',
  categories: new Set(),                 // research “name” filters
  levels: new Set(['I','II','III','IV','V','VI','VII']),
  completed: 'uncompleted',              // radio: uncompleted | completed | all
  speed: { base: 0, bonus: 0 },          // for later use
  completedMap: JSON.parse(localStorage.getItem('completedResearch') || '{}')
};

function isVisible(group) {
  const finished = (state.completedMap[group.id] || 0) >= group.innerLevels.length;
  const show =
    (state.completed === 'all') ||
    (state.completed === 'completed' ? finished : !finished);

  return (
    group.tree === state.tree &&
    state.categories.has(group.name) &&
    state.levels.has(group.level) &&
    show
  );
}

function isGroupComplete(group) {
  return (state.completedMap[group.id] || 0) >= group.innerLevels.length;
}

function updateCategoryOptions() {
  // 1️ gather unique categories (name + buff) for current tree
  const unique = new Map();
  for (const g of researchData) {
    if (g.tree !== state.tree) continue;
    if (!unique.has(g.name)) unique.set(g.name, { name: g.name, buff: g.buff });
  }

  // 2️ sort by buff then name
  const list = [...unique.values()].sort(
    (a, b) => a.buff.localeCompare(b.buff) || a.name.localeCompare(b.name)
  );

  // 3️ rebuild the <select>
  const sel = document.getElementById('category-select');
  sel.innerHTML = '';
  state.categories.clear();

  for (const c of list) {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = `${c.name} (${c.buff})`;
    opt.selected = true;
    sel.appendChild(opt);
    state.categories.add(c.name);
  }
}

function renderResearchRow(group) {
  const tr = document.createElement('tr');

  // max inner level = #levels, dropdown 0…max
  const maxLvl = group.innerLevels.length;
  const current  = state.completedMap[group.id] || 0;

  const select = document.createElement('select');
  for (let i = 0; i <= maxLvl; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i === 0 ? 'None' : `Level ${i}`;
    if (i === current) opt.selected = true;
    select.appendChild(opt);
  }

  // persist on change
  select.addEventListener('change', () => {
    state.completedMap[group.id] = parseInt(select.value, 10);
    localStorage.setItem('completedResearch', JSON.stringify(state.completedMap));
    updateResearchList();
  });

  tr.innerHTML = `
    <td>${group.name} ${group.level}</td>
    <td>${group.buff || ''}</td>
    <td></td>
  `;
  tr.children[2].appendChild(select);
  return tr;
}

function updateResearchList() {
  const tbody = document.getElementById('research-body');
  tbody.innerHTML = '';

  const visible = researchData
    .filter(isVisible)
    .sort(
      (a, b) => a.level.localeCompare(b.level) || a.buff.localeCompare(b.buff)
    );

  for (const g of visible) tbody.appendChild(renderResearchRow(g));
}


function addListeners() {
  // tree dropdown
  document.getElementById('tree-select').addEventListener('change', e => {
    state.tree = e.target.value;
    updateCategoryOptions();
    updateResearchList();
  });

  // multi-select category
  document.getElementById('category-select').addEventListener('change', e => {
    state.categories = new Set([...e.target.selectedOptions].map(o => o.value));
    updateResearchList();
  });

  // multi-select main level */
  document.getElementById('level-select').addEventListener('change', e => {
    state.levels = new Set([...e.target.selectedOptions].map(o => o.value));
    updateResearchList();
  });

  // completed radio buttons
  document.querySelectorAll('input[name="completed"]').forEach(r =>
    r.addEventListener('change', e => {
      state.completed = e.target.value;
      updateResearchList();
    })
  );

  // speed inputs (not yet used)
  document.getElementById('base-speed')
    .addEventListener('input', e => state.speed.base  = parseFloat(e.target.value) || 0);
  document.getElementById('bonus-speed')
    .addEventListener('input', e => state.speed.bonus = parseFloat(e.target.value) || 0);

  // buttons
  document.getElementById('max-all').addEventListener('click', () => {
    for (const g of researchData) state.completedMap[g.id] = g.innerLevels.length;
    localStorage.setItem('completedResearch', JSON.stringify(state.completedMap));
    updateResearchList();
  });

  document.getElementById('reset-research').addEventListener('click', () => {
    for (const g of researchData) state.completedMap[g.id] = null;
    localStorage.setItem('completedResearch', JSON.stringify(state.completedMap));
    updateResearchList();
  });
}

/* ────────────────────  bootstrap  ──────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  addListeners();
  updateCategoryOptions();
  updateResearchList();
});
