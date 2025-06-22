import { researchData } from './research_data.js';
import { toHMS, formatPcnt, roundPcnt } from './utils.js';

const base_data = [
  {
    level: 1,
    baseSpeed: 0.001
  },
  {
    level: 2,
    baseSpeed: 0.002
  },
  {
    level: 3,
    baseSpeed: 0.003
  },
  {
    level: 4,
    baseSpeed: 0.004
  },
  {
    level: 5,
    baseSpeed: 0.005
  },
  {
    level: 6,
    baseSpeed: 0.006
  },
  {
    level: 7,
    baseSpeed: 0.007
  },
  {
    level: 8,
    baseSpeed: 0.008
  },
  {
    level: 9,
    baseSpeed: 0.009
  },
  {
    level: 10,
    baseSpeed: 0.010
  },
  {
    level: 11,
    baseSpeed: 0.011
  },
  {
    level: 12,
    baseSpeed: 0.012
  },
  {
    level: 13,
    baseSpeed: 0.013
  },
  {
    level: 14,
    baseSpeed: 0.014
  },
  {
    level: 15,
    baseSpeed: 0.015
  },
  {
    level: 16,
    baseSpeed: 0.016
  },
  {
    level: 17,
    baseSpeed: 0.017
  },
  {
    level: 18,
    baseSpeed: 0.018
  },
  {
    level: 19,
    baseSpeed: 0.019
  },
  {
    level: 20,
    baseSpeed: 0.020
  },
  {
    level: 21,
    baseSpeed: 0.021
  },
  {
    level: 22,
    baseSpeed: 0.022
  },
  {
    level: 23,
    baseSpeed: 0.023
  },
  {
    level: 24,
    baseSpeed: 0.024
  },
  {
    level: 25,
    baseSpeed: 0.025
  },
  {
    level: 26,
    baseSpeed: 0.026
  },
  {
    level: 27,
    baseSpeed: 0.027
  },
  {
    level: 28,
    baseSpeed: 0.028
  },
  {
    level: 29,
    baseSpeed: 0.029
  },
  {
    level: 30,
    baseSpeed: 0.030
  }
];

const state = {
  tree: 'Growth',
  categories: new Set(),
  levels: new Set(['I','II','III','IV','V','VI','VII']),
  completed: 'uncompleted',
  speed: JSON.parse(localStorage.getItem('researchSpeed')) || { base: 0, bonus: 0 },
  completedMap: JSON.parse(localStorage.getItem('completedResearch') || '{}'),
  academyLevel: Number(JSON.parse(localStorage.getItem('academyLevel') || 0)),
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

function getTotalName(tree) {
  if (tree === 'Growth') return 'TOTAL GROWTH';
  if (tree === 'Economy') return 'TOTAL ECONOMY';
  if (tree === 'Battle') return 'TOTAL BATTLE';
  return '';
}

function aggregateDataForTable(data) {
  const totals = {
    'TOTAL': { value: 0, count: 0, time: 0, power: 0 }
  };

  for (const g of data) {
    const key = g.buff;
    if (!totals[key]) totals[key] = { value: 0, count: 0, time: 0, power: 0 };
    const totalKey = getTotalName(g.tree);
    if (!totals[totalKey]) totals[totalKey] = { value: 0, count: 0, time: 0, power: 0 };

    totals[key].value += g.buffValue;
    totals[key].count += 1;
    totals[key].time  += g.timeSeconds;
    totals[key].power += g.power;

    totals[totalKey].count += 1;
    totals[totalKey].time  += g.timeSeconds;
    totals[totalKey].power += g.power;

    totals['TOTAL'].count += 1;
    totals['TOTAL'].time  += g.timeSeconds;
    totals['TOTAL'].power += g.power;
  }
  return totals;
}

function isPcntRow(buff) {
  return buff.includes('Speed') ||
         buff.includes('Output') ||
         buff.includes('Attack') ||
         buff.includes('Defense') ||
         buff.includes('Health') ||
         buff.includes('Lethality');
}

function updateBuffTable(data, tableId) {
  const aggData = aggregateDataForTable(data);
  const rows = document.querySelectorAll(`#${tableId} tbody tr`);

  rows.forEach(row => {
    if (row.cells.length < 5) return;

    const buffName = row.cells[0].textContent.trim();
    const data = aggData[buffName];

    if (buffName.slice(0, 5) === 'TOTAL' && data) {
      const count = data.count;
      const time = toHMS(data.time);
      const power = data.power.toLocaleString();
      row.cells[1].textContent = '';
      row.cells[2].innerHTML = `<strong>${count}</strong>`;
      row.cells[3].innerHTML = `<strong>${time}</strong>`;
      row.cells[4].innerHTML = `<strong>${power}</strong>`;
    } else if (data) {
      row.cells[1].textContent = '+' + (isPcntRow(buffName) ? formatPcnt(data.value) : data.value.toLocaleString());
      row.cells[2].textContent = data.count;
      row.cells[3].textContent = toHMS(data.time);
      row.cells[4].textContent = data.power.toLocaleString();
    } else {
      row.cells[1].textContent = 'None';
      row.cells[2].textContent = 0;
      row.cells[3].textContent = '0s';
      row.cells[4].textContent = 0;
    }
  });
}

function updateTimeInvested() {
  updateBuffTable(completedResearchDetails(), 'completed-research');
  updateBuffTable(uncompletedLvlResearchDetails(), 'uncompleted-lvl-research');
  updateBuffTable(uncompletedAllResearchDetails(), 'uncompleted-all-research');
}

function researchSpeed() {
  return (state.speed.base + state.speed.bonus) / 100;
}

function completedResearchDetails() {
  const modifier = 1 / (1 + researchSpeed());
  return researchData.flatMap(group => {
    const maxDone = state.completedMap[group.id] || 0;
    if (!maxDone) return [];

    return group.innerLevels
      .filter(il => il.innerLevel <= maxDone)
      .map(il => ({
        id:           group.id,
        tree:         group.tree,
        name:         group.name,
        level:        group.level,
        buff:         group.buff,
        innerLevel:   il.innerLevel,
        academyLevel: il.academyLevel,
        prerequisite: il.prerequisite,
        bread:        il.bread,
        wood:         il.wood,
        stone:        il.stone,
        iron:         il.iron,
        gold:         il.gold,
        timeSeconds:  il.rawTimeSeconds * modifier,
        power:        il.power,
        buffValue:    il.buffValue
      }));
  });
}

function uncompletedLvlResearchDetails() {
  const modifier = 1 / (1 + researchSpeed());
  return researchData.flatMap(group => {
    const maxDone = state.completedMap[group.id] || 0;

    return group.innerLevels
      .filter(il => (il.innerLevel > maxDone) && (il.academyLevel <= state.academyLevel))
      .map(il => ({
        id:           group.id,
        tree:         group.tree,
        name:         group.name,
        level:        group.level,
        buff:         group.buff,
        innerLevel:   il.innerLevel,
        academyLevel: il.academyLevel,
        prerequisite: il.prerequisite,
        bread:        il.bread,
        wood:         il.wood,
        stone:        il.stone,
        iron:         il.iron,
        gold:         il.gold,
        timeSeconds:  il.rawTimeSeconds * modifier,
        power:        il.power,
        buffValue:    il.buffValue
      }));
  });
}

function uncompletedAllResearchDetails() {
  const modifier = 1 / (1 + researchSpeed());
  return researchData.flatMap(group => {
    const maxDone = state.completedMap[group.id] || 0;

    return group.innerLevels
      .filter(il => il.innerLevel > maxDone)
      .map(il => ({
        id:           group.id,
        tree:         group.tree,
        name:         group.name,
        level:        group.level,
        buff:         group.buff,
        innerLevel:   il.innerLevel,
        academyLevel: il.academyLevel,
        prerequisite: il.prerequisite,
        bread:        il.bread,
        wood:         il.wood,
        stone:        il.stone,
        iron:         il.iron,
        gold:         il.gold,
        timeSeconds:  il.rawTimeSeconds * modifier,
        power:        il.power,
        buffValue:    il.buffValue
      }));
  });
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

function setBaseSpeed(level) {
  const baseSpeed = base_data.find(inner => inner.level === level).baseSpeed;
  document.getElementById("base-speed").value = roundPcnt(baseSpeed);
}


function updateAcademy(e) {
  e.preventDefault();

  state.academyLevel = Number(e.target.value);
  localStorage.setItem('academyLevel', JSON.stringify(state.academyLevel));

  setBaseSpeed(state.academyLevel);
  localStorage.setItem('researchSpeed', JSON.stringify(state.speed));

  updateTimeInvested();
}

function initPage() {
  updateCategoryOptions();
  updateResearchList();
  updateTimeInvested();
  document.getElementById('base-speed').value = state.speed.base;
  document.getElementById('bonus-speed').value = state.speed.bonus;
  document.getElementById('academy-select').value = state.academyLevel;
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

  // buttons
  document.getElementById('max-all').addEventListener('click', setFilteredMax);
  document.getElementById('clear-all').addEventListener('click', setFilteredNone);
  document.getElementById('reset-research').addEventListener('click', setAllNone);

  // speed inputs
  document.getElementById('bonus-speed').addEventListener('input', updateSpeed);

  // academy level
  document.getElementById('academy-select').addEventListener('input', updateAcademy);
}

/* ────────────────────  bootstrap  ──────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPage();
  addListeners();
});
