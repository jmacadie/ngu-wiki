import { researchData } from './research_data.js';
import { toHMS, formatPcnt } from './utils.js';

const state = {
  tree: 'Growth',
  categories: new Set(),
  levels: new Set(['I','II','III','IV','V','VI','VII']),
  completed: 'uncompleted',
  speed: { base: 0, bonus: 0 },
  completedMap: JSON.parse(localStorage.getItem('completedResearch') || '{}')
};

function updateCategoryOptions() {
  const rawList = researchData
    .filter(r => r.Tree === state.tree)
    .map(r => ({ name: r['MainName'], buff: r['BuffType'] || '' }));
  const uniqueMap = new Map();
  for (const item of rawList) {
    if (!uniqueMap.has(item.name)) {
      uniqueMap.set(item.name, item);
    }
  }

  const uniqueList = [...uniqueMap.values()].sort((a, b) =>
    a.buff.localeCompare(b.buff) || a.name.localeCompare(b.name)
  );

  const select = document.getElementById('category-select');
  select.innerHTML = '';
  state.categories.clear();

  for (const category of uniqueList) {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = `${category.name} (${category.buff})`;
    option.selected = true;
    select.appendChild(option);
    state.categories.add(category.name);
  }
}

function updateResearchList() {
  const tbody = document.getElementById('research-body');
  tbody.innerHTML = '';

  const groups = getFilteredGroupedResearch();
  const sorted = [...groups.values()].sort((a, b) => {
    return a[0].MainLevel.localeCompare(b[0].MainLevel) || a[0].BuffType.localeCompare(b[0].BuffType)
  });

  for (const group of sorted) {
    const row = renderResearchRow(group);
    tbody.appendChild(row);
  }
}

function getFilteredGroupedResearch() {
  const grouped = new Map();

  for (const r of researchData) {
    if (!isResearchVisible(r)) continue;

    const key = `${r.MainName}__${r.MainLevel}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(r);
  }

  return [...grouped.values()];
}

function isResearchVisible(r) {
  return (
    r.Tree === state.tree &&
    state.categories.has(r.MainName) &&
    state.levels.has(r.MainLevel) &&
    (state.completed === 'all' ||
     (state.completed === 'completed') === isGroupCompleted(r.MainName, r.MainLevel))
  );
}

function isGroupCompleted(mainName, mainLevel) {
  return researchData.some(r =>
    r.MainName === mainName &&
    r.MainLevel === mainLevel &&
    state.completedMap[r.id] &&
    state.completedMap[r.id] >= r.InnerLevel
  );
}

function renderResearchRow(group) {
  const tr = document.createElement('tr');
  const { MainName, MainLevel, BuffType } = group[0];

  const maxLevel = Math.max(...group.map(r => r.InnerLevel));
  const ids = group.map(r => r.id);
  const current = Math.max(...ids.map(id => state.completedMap[id] || 0));

  const select = document.createElement('select');
  for (let i = 0; i <= maxLevel; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i === 0 ? 'None' : `Level ${i}`;
    if (i === current) opt.selected = true;
    select.appendChild(opt);
  }

  select.addEventListener('change', () => {
    const newLevel = parseInt(select.value);
    for (const r of group) {
      state.completedMap[r.id] = r.InnerLevel <= newLevel ? r.InnerLevel : 0;
    }
    localStorage.setItem('completedResearch', JSON.stringify(state.completedMap));
  });

  tr.innerHTML = `
    <td>${MainName} ${MainLevel}</td>
    <td>${BuffType || ''}</td>
    <td></td>
  `;
  tr.children[2].appendChild(select);
  return tr;
}

function addListeners() {
  document.getElementById('tree-select').addEventListener('change', e => {
	state.tree = e.target.value;
	updateCategoryOptions();
	updateResearchList();
  });

  document.getElementById('category-select').addEventListener('change', e => {
	const selected = new Set([...e.target.selectedOptions].map(opt => opt.value));
	state.categories = selected;
	updateResearchList();
  });

  document.getElementById('level-select').addEventListener('change', e => {
	const selected = new Set([...e.target.selectedOptions].map(opt => opt.value));
	state.levels = selected;
	updateResearchList();
  });

  document.querySelectorAll('input[name="completed"]').forEach(r => r.addEventListener('change', e => {
	state.completed = e.target.value;
	updateResearchList();
  }));

  document.getElementById('base-speed').addEventListener('input', e => {
	state.speed.base = parseFloat(e.target.value) || 0;
  });

  document.getElementById('bonus-speed').addEventListener('input', e => {
	state.speed.bonus = parseFloat(e.target.value) || 0;
  });

  document.getElementById('max-all').addEventListener('click', () => {
	for (const r of researchData) state.completedMap[r.id] = parseInt(r['Inner Level']);
	localStorage.setItem('completedResearch', JSON.stringify(state.completedMap));
	updateResearchList();
  });

  document.getElementById('clear-all').addEventListener('click', () => {
	for (const r of researchData) state.completedMap[r.id] = 0;
	localStorage.setItem('completedResearch', JSON.stringify(state.completedMap));
	updateResearchList();
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  // Set up listeners
  addListeners();

  // initialize
  updateCategoryOptions();
  updateResearchList();
});

