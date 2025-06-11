import { researchData } from './research_data.js';
import { toHMS, formatPcnt } from './utils.js';

const state = {
  tree: 'Growth',
  categories: new Set(),                 // research “name” filters
  levels: new Set(['I','II','III','IV','V','VI','VII']),
  completed: 'uncompleted',              // radio: uncompleted | completed | all
  speed: JSON.parse(localStorage.getItem('researchSpeed')) || { base: 0, bonus: 0 },
  completedMap: JSON.parse(localStorage.getItem('completedResearch') || '{}'),
  visible: new Set(), 
};

function isVisible(group) {
  const finished = isGroupComplete(group);
  const started = isGroupStarted(group);
  const show =
    (state.completed === 'all') ||
    (state.completed === 'completed' && started) ||
	(state.completed === 'uncompleted' && !finished) ;

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

function isGroupStarted(group) {
  return (state.completedMap[group.id] || 0) >= 1;
}

function getCategories() {
  // gather unique categories (name + buff) for current tree
  const unique = new Map();
  for (const g of researchData) {
    if (g.tree !== state.tree) continue;
    if (!unique.has(g.name)) unique.set(g.name, { name: g.name, buff: g.buff });
  }

  // sort by buff, then name
  const list = [...unique.values()].sort(
    (a, b) => a.buff.localeCompare(b.buff) || a.name.localeCompare(b.name)
  );
  
  return list;
}

function updateCategoryOptions() {
  const list = getCategories();

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

  const maxLvl = group.innerLevels.length;
  const current  = state.completedMap[group.id] || 0;

  const select = document.createElement('select');
  for (let i = 0; i <= maxLvl; i++) {
    const opt = document.createElement('option');
    opt.value = i;
	let textVal = `Level ${i}`;
	if (i === 0) {
		textVal = 'None';
	} else if (i === maxLvl) {
		textVal = 'MAX';
	}
    opt.textContent = textVal;
    if (i === current) opt.selected = true;
    select.appendChild(opt);
  }

  select.addEventListener('change', () => {
    state.completedMap[group.id] = parseInt(select.value, 10);
    localStorage.setItem('completedResearch', JSON.stringify(state.completedMap));
    updateResearchList();
	updateTimeInvested();
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

  state.visible = new Set([...visible.values()].map(g => g.id));
  for (const g of visible) tbody.appendChild(renderResearchRow(g));
}

function setFilteredMax(e) {
  e.preventDefault();
  const researches = researchData.filter(g => state.visible.has(g.id));

  for (const group of researches) {
    state.completedMap[group.id] = group.innerLevels.length;
  }
  localStorage.setItem('completedResearch', JSON.stringify(state.completedMap));
  updateResearchList();
  updateTimeInvested();
}

function setFilteredNone(e) {
  e.preventDefault();
  const researches = researchData.filter(g => state.visible.has(g.id));

  for (const group of researches) state.completedMap[group.id] = 0;
  localStorage.setItem('completedResearch', JSON.stringify(state.completedMap));
  updateResearchList();
  updateTimeInvested();
}

function setAllNone(e) {
  e.preventDefault();
  for (const id of Object.keys(state.completedMap)) state.completedMap[id] = 0;
  localStorage.setItem('completedResearch', JSON.stringify(state.completedMap));
  updateResearchList();
  updateTimeInvested();
}

function updateTimeInvested() {
  const timeInvested = totalInvested();
  const timetotInvested = timeInvested.reduce((sum, time) => sum + time, 0);
  const timeInvestedHMS = toHMS(timeInvested.reduce((sum, time) => sum + time, 0));
  document.getElementById('tot-time-taken').textContent = timeInvestedHMS;
  document.getElementById('tot-items-researched').textContent = timeInvested.length;
  
  const timeRemaining = totalRemaining();
  const timetotRemaining = timeRemaining.reduce((sum, time) => sum + time, 0);
  const timeRemainingHMS = toHMS(timeRemaining.reduce((sum, time) => sum + time, 0));
  document.getElementById('tot-time-remaining').textContent = timeRemainingHMS;
  document.getElementById('tot-items-to-research').textContent = timeRemaining.length;
}

function researchSpeed() {
	return (state.speed.base + state.speed.bonus) / 100;
}

function totalInvested() {
  const modifier = 1 / (1 + researchSpeed());
  return researchData
	.map(g => g.innerLevels.filter(i => i.innerLevel <= state.completedMap[g.id]))
	.filter(inner => inner.length)
	.flat()
	.map(level => level.rawTimeSeconds * modifier);
}

function totalRemaining() {
  const modifier = 1 / (1 + researchSpeed());
  return researchData
	.map(g => g.innerLevels.filter(i => i.innerLevel > state.completedMap[g.id]))
	.filter(inner => inner.length)
	.flat()
	.map(level => level.rawTimeSeconds * modifier);
}

function updateSpeed(e) {
  e.preventDefault();
  
  const elBase = document.getElementById('base-speed');
  const elBonus = document.getElementById('bonus-speed');
  state.speed.base  = parseFloat(elBase.value) || 0;
  state.speed.bonus = parseFloat(elBonus.value) || 0;
  localStorage.setItem('researchSpeed', JSON.stringify(state.speed));
  
  updateTimeInvested();
}

function initPage() {
  updateCategoryOptions();
  updateResearchList();
  updateTimeInvested();
  document.getElementById('base-speed').value = state.speed.base;
  document.getElementById('bonus-speed').value = state.speed.bonus;
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

  // speed inputs
  document.getElementById('base-speed').addEventListener('input', updateSpeed);
  document.getElementById('bonus-speed').addEventListener('input', updateSpeed);

  // buttons
  document.getElementById('max-all').addEventListener('click', setFilteredMax);
  document.getElementById('clear-all').addEventListener('click', setFilteredNone);
  document.getElementById('reset-research').addEventListener('click', setAllNone);
}

/* ────────────────────  bootstrap  ──────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  addListeners();
  initPage();
});
