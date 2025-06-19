import { toHMS, roundPcnt } from './utils.js';

const training_data = [
  {
	  level: 1,
	  power: 3,
	  time: 12,
    minTCLevel: 1
  },
  {
	  level: 2,
	  power: 4,
	  time: 17,
    minTCLevel: 4
  },
  {
	  level: 3,
	  power: 6,
	  time: 24,
    minTCLevel: 7
  },
  {
	  level: 4,
	  power: 9,
	  time: 32,
    minTCLevel: 11
  },
  {
	  level: 5,
	  power: 13,
	  time: 44,
    minTCLevel: 13
  },
  {
	  level: 6,
	  power: 20,
	  time: 60,
    minTCLevel: 16
  },
  {
	  level: 7,
	  power: 28,
	  time: 83,
    minTCLevel: 19
  },
  {
	  level: 8,
	  power: 38,
	  time: 113,
    minTCLevel: 22
  },
  {
	  level: 9,
	  power: 50,
	  time: 131,
    minTCLevel: 26
  },
  {
	  level: 10,
	  power: 66,
	  time: 152,
    minTCLevel: 30
  },
];

const base_data = [
  {
    level: 1,
    baseSpeed: 0.003,
    baseCapacity: 17
  },
  {
    level: 2,
    baseSpeed: 0.005,
    baseCapacity: 22
  },
  {
    level: 3,
    baseSpeed: 0.008,
    baseCapacity: 26
  },
  {
    level: 4,
    baseSpeed: 0.010,
    baseCapacity: 30
  },
  {
    level: 5,
    baseSpeed: 0.013,
    baseCapacity: 35
  },
  {
    level: 6,
    baseSpeed: 0.016,
    baseCapacity: 39
  },
  {
    level: 7,
    baseSpeed: 0.018,
    baseCapacity: 43
  },
  {
    level: 8,
    baseSpeed: 0.021,
    baseCapacity: 48
  },
  {
    level: 9,
    baseSpeed: 0.024,
    baseCapacity: 52
  },
  {
    level: 10,
    baseSpeed: 0.026,
    baseCapacity: 56
  },
  {
    level: 11,
    baseSpeed: 0.029,
    baseCapacity: 61
  },
  {
    level: 12,
    baseSpeed: 0.032,
    baseCapacity: 65
  },
  {
    level: 13,
    baseSpeed: 0.034,
    baseCapacity: 69
  },
  {
    level: 14,
    baseSpeed: 0.037,
    baseCapacity: 76
  },
  {
    level: 15,
    baseSpeed: 0.040,
    baseCapacity: 84
  },
  {
    level: 16,
    baseSpeed: 0.042,
    baseCapacity: 92
  },
  {
    level: 17,
    baseSpeed: 0.045,
    baseCapacity: 101
  },
  {
    level: 18,
    baseSpeed: 0.048,
    baseCapacity: 109
  },
  {
    level: 19,
    baseSpeed: 0.050,
    baseCapacity: 117
  },
  {
    level: 20,
    baseSpeed: 0.053,
    baseCapacity: 126
  },
  {
    level: 21,
    baseSpeed: 0.056,
    baseCapacity: 134
  },
  {
    level: 22,
    baseSpeed: 0.058,
    baseCapacity: 142
  },
  {
    level: 23,
    baseSpeed: 0.061,
    baseCapacity: 151
  },
  {
    level: 24,
    baseSpeed: 0.064,
    baseCapacity: 159
  },
  {
    level: 25,
    baseSpeed: 0.067,
    baseCapacity: 167
  },
  {
    level: 26,
    baseSpeed: 0.069,
    baseCapacity: 176
  },
  {
    level: 27,
    baseSpeed: 0.072,
    baseCapacity: 184
  },
  {
    level: 28,
    baseSpeed: 0.074,
    baseCapacity: 192
  },
  {
    level: 29,
    baseSpeed: 0.077,
    baseCapacity: 201
  },
  {
    level: 30,
    baseSpeed: 0.080,
    baseCapacity: 209
  }
];

const state = {
  "all": {
	  "level": 1,
	  "baseCapacity": 0,
	  "bonusCapacity": 0,
	  "capacity": 0,
	  "baseSpeed": 0,
	  "bonusSpeed": 0,
	  "speed": 0
  },
  "barracks": {
	  "level": 1,
	  "baseCapacity": 0,
	  "bonusCapacity": 0,
	  "capacity": 0,
	  "baseSpeed": 0,
	  "bonusSpeed": 0,
	  "speed": 0
  },
  "stables": {
	  "level": 1,
	  "baseCapacity": 0,
	  "bonusCapacity": 0,
	  "capacity": 0,
	  "baseSpeed": 0,
	  "bonusSpeed": 0,
	  "speed": 0
  },
  "range": {
	  "level": 1,
	  "baseCapacity": 0,
	  "bonusCapacity": 0,
	  "capacity": 0,
	  "baseSpeed": 0,
	  "bonusSpeed": 0,
	  "speed": 0
  },
  "trainNew": {
    "barracks": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0
    },
    "stables": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0
    },
    "range": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0
    },
    "all": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0
    }
  },
  "promote": {
    "barracks": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0
    },
    "stables": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0
    },
    "range": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0
    },
    "all": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0
    }
  },
  "currentTroopLevels": {
    "barracks": 1,
    "stables": 1,
    "range": 1,
    "all": 1,
  },
  "currentTroops": {
    "infantry": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "total": 0
    },
      "cavalry": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "total": 0
    },
    "archers": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "total": 0
    },
    "total": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "total": 0
    }
  },
  "targetTroops": {
    "infantry": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "total": 0
    },
      "cavalry": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "total": 0
    },
    "archers": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "total": 0
    },
    "total": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "total": 0
    }
  },
}

const STORAGE_KEY = 'ngu_troop_inputs';

const bonusSpeeds = ["all-buildings-bonus-speed", "barracks-bonus-speed", "stables-bonus-speed", "range-bonus-speed"];
const bonusCapacities = ["all-buildings-bonus-capacity", "barracks-bonus-capacity", "stables-bonus-capacity", "range-bonus-capacity"];

function statType(el) {
  return el.replace("all-buildings-", "")
           .replace("barracks-", "")
           .replace("stables-", "")
           .replace("range-", "")
           .replace("-s", "S")
           .replace("-c", "C");
}

function buildingType(el) {
  if (el.startsWith("all-buildings")) {
    return "all";
  } else if (el.startsWith("barracks")) {
    return "barracks";
  } else if (el.startsWith("stables")) {
    return "stables";
  } else if (el.startsWith("range")) {
    return "range";
  }
  return "";
}

function updateState(el, value) {
  const targetBuilding = state[buildingType(el)];
  if (targetBuilding) {
    const stat = statType(el);
    if (stat === "baseCapacity" || stat === "bonusCapacity") {
      targetBuilding.capacity -= targetBuilding[stat];
      targetBuilding[stat] = value;
      targetBuilding.capacity += value;
    } else if (stat === "baseSpeed" || stat === "bonusSpeed") {
      targetBuilding.speed -= targetBuilding[stat];
      targetBuilding[stat] = value;
      targetBuilding.speed += value;
    } else if (stat === "level") {
      targetBuilding[stat] = value;
    }
  }
}

function loadStateFromLocalStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      loadStateFromParsedSecion(state.all, parsed.all);
      loadStateFromParsedSecion(state.barracks, parsed.barracks);
      loadStateFromParsedSecion(state.stables, parsed.stables);
      loadStateFromParsedSecion(state.range, parsed.range);
      if (parsed.trainNew) {
        loadStateFromParsedSecion(state.trainNew.barracks, parsed.trainNew.barracks);
        loadStateFromParsedSecion(state.trainNew.stables, parsed.trainNew.stables);
        loadStateFromParsedSecion(state.trainNew.range, parsed.trainNew.range);
        loadStateFromParsedSecion(state.trainNew.all, parsed.trainNew.all);
      }
      if (parsed.promote) {
        loadStateFromParsedSecion(state.promote.barracks, parsed.promote.barracks);
        loadStateFromParsedSecion(state.promote.stables, parsed.promote.stables);
        loadStateFromParsedSecion(state.promote.range, parsed.promote.range);
        loadStateFromParsedSecion(state.promote.all, parsed.promote.all);
      }
      loadStateFromParsedSecion(state.currentTroopLevels, parsed.currentTroopLevels);
      if (parsed.currentTroops) {
        loadStateFromParsedSecion(state.currentTroops.infantry, parsed.currentTroops.infantry);
        loadStateFromParsedSecion(state.currentTroops.cavalry, parsed.currentTroops.cavalry);
        loadStateFromParsedSecion(state.currentTroops.archers, parsed.currentTroops.archers);
        loadStateFromParsedSecion(state.currentTroops.total, parsed.currentTroops.total);
      }
      if (parsed.targetTroops) {
        loadStateFromParsedSecion(state.targetTroops.infantry, parsed.targetTroops.infantry);
        loadStateFromParsedSecion(state.targetTroops.cavalry, parsed.targetTroops.cavalry);
        loadStateFromParsedSecion(state.targetTroops.archers, parsed.targetTroops.archers);
        loadStateFromParsedSecion(state.targetTroops.total, parsed.targetTroops.total);
      }
      loadAllBuildingInputs();
    } catch (e) {
      console.warn('Failed to parse saved inputs:', e);
    }
  }
}

function loadStateFromParsedSecion(s, p) {
  for (const key of Object.keys(s)) {
    if (p && key in p) {
      s[key] = p[key] || 0;
    }
  }
}

function loadAllBuildingInputs() {
  ["all-buildings", "barracks", "stables", "range"].forEach(b => loadBuildingInputs(b));
}

function loadBuildingInputs(building) {
  const buildingState = state[buildingType(building)];
  document.getElementById(`${building}-level`).value = buildingState.level;
  document.getElementById(`${building}-base-capacity`).value = buildingState.baseCapacity;
  document.getElementById(`${building}-bonus-capacity`).value = buildingState.bonusCapacity;
  document.getElementById(`${building}-base-speed`).value = buildingState.baseSpeed * 100;
  document.getElementById(`${building}-bonus-speed`).value = buildingState.bonusSpeed * 100;
}

function getBase(level) {
  return base_data.find(inner => inner.level === level);
}

function setBaseSpeed(el, level) {
  const baseSpeed = getBase(level).baseSpeed;
  document.getElementById(el).value = roundPcnt(baseSpeed);
  updateState(el, baseSpeed);
}

function setBaseCapacity(el, level) {
  const baseCapacity = getBase(level).baseCapacity;
  document.getElementById(el).value = baseCapacity;
  updateState(el, baseCapacity);
}

function toggleInputs(e) {
  const el = e.target;
  const allInputs = document.getElementById("all-building-inputs");
  const sepInputs = document.getElementById("separate-building-inputs");
  const allTable = document.getElementById("all-building-table");
  const sepTables = document.getElementById("separate-building-tables");
  if (el.checked) {
    allInputs.classList.add("show-section");
    allInputs.classList.remove("hide-section");
    sepInputs.classList.remove("show-section");
    sepInputs.classList.add("hide-section");
    allTable.classList.add("show-section");
    allTable.classList.remove("hide-section");
    sepTables.classList.remove("show-section");
    sepTables.classList.add("hide-section");
  } else {
    allInputs.classList.remove("show-section");
    allInputs.classList.add("hide-section");
    sepInputs.classList.add("show-section");
    sepInputs.classList.remove("hide-section");
    allTable.classList.add("hide-section");
    allTable.classList.remove("show-section");
    sepTables.classList.remove("hide-section");
    sepTables.classList.add("show-section");
  }
}

function processInner(building, level) {
  setBaseSpeed(`${building}-base-speed`, level);
  setBaseCapacity(`${building}-base-capacity`, level);
  updateState(`${building}-level`, level);
}

function processAllLevel(e) {
  const level = Number(e.target.value);
  
  processInner("all-buildings", level);
  
  document.getElementById("barracks-level").value = level;
  processInner("barracks", level);
  document.getElementById("stables-level").value = level;
  processInner("stables", level);
  document.getElementById("range-level").value = level;
  processInner("range", level);
  
  updateAllTrainingLists();
  hideTroopLevels();
  calculateTotalTimes();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function processLevel(e) {
  const building = buildingType(e.target.id);
  const level = Number(e.target.value);
  processInner(building, level);
  switch (building) {
  case "barracks":
    updateTrainingList('training-body-barracks', state.barracks, "barracks");
    break;
  case "stables":
    updateTrainingList('training-body-stables', state.stables, "barracks");
    break;
  case "range":
    updateTrainingList('training-body-range', state.range, "barracks");
    break;
  }
  hideTroopLevels();
  calculateTotalTimes();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function processBonusSpeed(e) {
  const amount = Number(e.target.value);
  const pcnt = amount / 100;
  bonusSpeeds.forEach(el => {
    document.getElementById(el).value = amount;
    updateState(el, pcnt);
  });
  updateAllTrainingLists();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function processBonusCapacity(e) {
  const amount = Number(e.target.value);
  bonusCapacities.forEach(el => {
    document.getElementById(el).value = amount;
    updateState(el, amount);
  });
  updateAllTrainingLists();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function calculateTrainingTimes(level, capacity, speed, type) {
  const raw = training_data
            .filter(data => data.minTCLevel <= level)
            .map(data => {
              const time = data.time * capacity / (1 + speed);
              return {
                "level": data.level,
                "time": time
              }
            });

  Object.keys(state.trainNew[type]).forEach(v => state.trainNew[type][v] = 0);
  Object.keys(state.promote[type]).forEach(v => state.promote[type][v] = 0);
  const last = raw.at(-1);
  state.currentTroopLevels[type] = last.level;
  
  if (last) {
    const maxLevelTime = last.time;
    return raw.map(data => {
      state.trainNew[type][data.level] = data.time / capacity;
      if (data.level === last.level) {
        return {
          "level": data.level,
          "time": data.time,
          "fullPromoteNum": null,
          "fullPromoteTime": null
        };
      }
      
      const additionalTime = maxLevelTime - data.time;
      state.promote[type][data.level] = additionalTime / capacity;
      const fullPromoteNum = Math.floor(maxLevelTime * capacity / additionalTime);
      const fullPromoteTime = fullPromoteNum * additionalTime / capacity;
      return {
        "level": data.level,
        "time": data.time,
        "fullPromoteNum": fullPromoteNum,
        "fullPromoteTime": fullPromoteTime
      };
    });
  }
}

function renderTrainingRow(group, capacity) {
  const tr = document.createElement('tr');
  if (!group.fullPromoteNum) {
    tr.innerHTML = `
      <td class="end-section">T${group.level}</td>
      <td>${capacity.toLocaleString()}</td>
      <td class="end-section">${toHMS(group.time)}</td>
      <td></td>
      <td></td>
    `;
    return tr;
  }
  tr.innerHTML = `
    <td class="end-section">T${group.level}</td>
    <td>${capacity.toLocaleString()}</td>
    <td class="end-section">${toHMS(group.time)}</td>
    <td>${group.fullPromoteNum.toLocaleString()}</td>
    <td>${toHMS(group.fullPromoteTime)}</td>
  `;
  return tr;
}

function updateTrainingList(bodyId, data, type) {
  const tbody = document.getElementById(bodyId);
  tbody.innerHTML = '';

  const times = calculateTrainingTimes(data.level, data.capacity, data.speed, type);
  if (times) {
    for (const g of times) tbody.appendChild(renderTrainingRow(g, data.capacity));
  }
}

function updateAllTrainingLists() {
  updateTrainingList('training-body', state.all, "all");
  updateTrainingList('training-body-barracks', state.barracks, "barracks");
  updateTrainingList('training-body-stables', state.stables, "stables");
  updateTrainingList('training-body-range', state.range, "range");
}

function loadTroopNumbers() {
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "total"].forEach(level => {
    ["infantry", "cavalry", "archers", "total"].forEach(troop => {
      const cellCurrent = document.getElementById(`current-${troop}-${level}`);
      const cellTarget = document.getElementById(`target-${troop}-${level}`);
      if (troop === "total" || level === "total") {
        cellCurrent.textContent = state.currentTroops[troop][level].toLocaleString();
        cellTarget.textContent = state.targetTroops[troop][level].toLocaleString();
      } else {
        cellCurrent.value = state.currentTroops[troop][level];
        cellTarget.value = state.targetTroops[troop][level];
      }
    });
  });
}

function processTroopInputNumbersChange(e) {
  const input = e.target;
  
  const parts = input.id.split("-");
  const troop = parts[1];
  const level = Number(parts[2]);
  
  const oldVal = state.currentTroops[troop][level];
  const oldRowTotal = state.currentTroops.total[level];
  const oldColTotal = state.currentTroops[troop].total;
  const oldGrandTotal = state.currentTroops.total.total;
  
  const newVal = Number(input.value) || 0;
  const delta = newVal - oldVal;
  state.currentTroops[troop][level] = newVal;
  
  const newRowTotal = oldRowTotal + delta;
  state.currentTroops.total[level] = newRowTotal;
  const newColTotal = oldColTotal + delta;
  state.currentTroops[troop].total = newColTotal;
  const newTotalTotal = oldGrandTotal + delta;
  state.currentTroops.total.total = newTotalTotal;
  
  const rowTotalCell = document.getElementById(`current-total-${level}`);
  rowTotalCell.textContent = newRowTotal.toLocaleString();
  const colTotalCell = document.getElementById(`current-${troop}-total`);
  colTotalCell.textContent = newColTotal.toLocaleString();
  const totalTotalCell = document.getElementById("current-total-total");
  totalTotalCell.textContent = newTotalTotal.toLocaleString();
  
  calculateTotalTimes();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function processTroopTargetNumbersChange(e) {
  const input = e.target;
  
  const parts = input.id.split("-");
  const troop = parts[1];
  const level = Number(parts[2]);
  
  const oldVal = state.targetTroops[troop][level];
  const oldRowTotal = state.targetTroops.total[level];
  const oldColTotal = state.targetTroops[troop].total;
  const oldGrandTotal = state.targetTroops.total.total;
  
  const newVal = Number(input.value) || 0;
  const delta = newVal - oldVal;
  state.targetTroops[troop][level] = newVal;
  
  const newRowTotal = oldRowTotal + delta;
  state.targetTroops.total[level] = newRowTotal;
  const newColTotal = oldColTotal + delta;
  state.targetTroops[troop].total = newColTotal;
  const newTotalTotal = oldGrandTotal + delta;
  state.targetTroops.total.total = newTotalTotal;
  
  const rowTotalCell = document.getElementById(`target-total-${level}`);
  rowTotalCell.textContent = newRowTotal.toLocaleString();
  const colTotalCell = document.getElementById(`target-${troop}-total`);
  colTotalCell.textContent = newColTotal.toLocaleString();
  const totalTotalCell = document.getElementById("target-total-total");
  totalTotalCell.textContent = newTotalTotal.toLocaleString();
  
  calculateTotalTargetTimes();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function hideTroopLevelsInner(type, max, min, b, s, r) {
  const rows = document.querySelectorAll(`#${type}-troops tbody tr`);
  var i = 0;
  rows.forEach(row => {
    i++;
    row.classList.remove("hide-row");
    if (i <= min || i == 11) {
      return;
    }
    if (i > max) {
      row.classList.add("hide-row");
      return;
    }
    
    const cellInfantry = document.getElementById(`${type}-infantry-${i}`);
    if (i > b) {
      cellInfantry.setAttribute("disabled", "");
    } else {
      cellInfantry.removeAttribute("disabled");
    }
    const cellCavalry = document.getElementById(`${type}-cavalry-${i}`);
    if (i > s) {
      cellCavalry.setAttribute("disabled", "");
    } else {
      cellCavalry.removeAttribute("disabled");
    }
    const cellArchers = document.getElementById(`${type}-archers-${i}`);
    if (i > r) {
      cellArchers.setAttribute("disabled", "");
    } else {
      cellArchers.removeAttribute("disabled");
    }
  });
}

function hideTroopLevels() {
  const barracksLevelTroops = training_data.findLast(data => data.minTCLevel <= state.barracks.level).level;
  const stablesLevelTroops = training_data.findLast(data => data.minTCLevel <= state.stables.level).level;
  const rangeLevelTroops = training_data.findLast(data => data.minTCLevel <= state.range.level).level;
  const maxLevelTroops = Math.max(barracksLevelTroops, stablesLevelTroops, rangeLevelTroops);
  const minLevelTroops = Math.min(barracksLevelTroops, stablesLevelTroops, rangeLevelTroops);
  
  hideTroopLevelsInner("current", maxLevelTroops, minLevelTroops, barracksLevelTroops, stablesLevelTroops, rangeLevelTroops);
  hideTroopLevelsInner("target", maxLevelTroops, minLevelTroops, barracksLevelTroops, stablesLevelTroops, rangeLevelTroops);
}

function calculateTotalPromoteTimes() {
  const infantryTime = Object.keys(state.currentTroops.infantry)
          .filter(k => Number(k) < state.currentTroopLevels.barracks)
          .map(level => state.currentTroops.infantry[level] * state.promote.barracks[level])
          .reduce((acc, time) => acc + time, 0);
  if (infantryTime) {
    document.getElementById("promote-infantry-time").textContent = toHMS(infantryTime);
  } else {
    document.getElementById("promote-infantry-time").textContent = "Nothing to promote";
  }
  
  const cavalryTime = Object.keys(state.currentTroops.cavalry)
          .filter(k => Number(k) < state.currentTroopLevels.stables)
          .map(level => state.currentTroops.cavalry[level] * state.promote.stables[level])
          .reduce((acc, time) => acc + time, 0);
  if (cavalryTime) {
    document.getElementById("promote-cavalry-time").textContent = toHMS(cavalryTime);
  } else {
    document.getElementById("promote-cavalry-time").textContent = "Nothing to promote";
  }
  
  const archersTime = Object.keys(state.currentTroops.archers)
          .filter(k => Number(k) < state.currentTroopLevels.range)
          .map(level => state.currentTroops.archers[level] * state.promote.range[level])
          .reduce((acc, time) => acc + time, 0);
  if (archersTime) {
    document.getElementById("promote-archers-time").textContent = toHMS(archersTime);
  } else {
    document.getElementById("promote-archers-time").textContent = "Nothing to promote";
  }
  
  const maxTime = Math.max(infantryTime, cavalryTime, archersTime);
  if (maxTime) {
    document.getElementById("promote-all-time").textContent = toHMS(maxTime);
  } else {
    document.getElementById("promote-all-time").textContent = "Nothing to promote";
  }
}

function getOneTotalTargetTime(currentLevel, currentNum, targetNum, trainNew, promote) {
  const delta =
    Object.keys(currentNum)
      .filter(k => Number(k) <= currentLevel)
      .map(level => {
        return {
          "level": Number(level),
          "delta": targetNum[level] - currentNum[level]
        };
      });
  
  const promotions =
    delta
      .filter(level => level.level < currentLevel && level.delta < 0)
      .map(level => {
        return {
          "level": level.level,
          "promotions": -level.delta
        };
      });
  const totPromotions = 
    promotions
      .map(level => level.promotions)
      .reduce((acc, time) => acc + time, 0);
  
  const topLevel = delta.find(level => level.level === currentLevel);
  if (topLevel.delta < totPromotions) {
    return;
  }
  topLevel.delta -= totPromotions; // deliberately mutating the delta array
  
  const newTroops =
    delta
      .filter(level => level.level <= currentLevel && level.delta > 0)
      .map(level => {
        return {
          "level": level.level,
          "newTroops": level.delta
        };
      });
  
  const promotionTime =
    promotions
      .map(level => level.promotions * promote[level.level])
      .reduce((acc, time) => acc + time, 0);
  const newTrainTime =
    newTroops
      .map(level => level.newTroops * trainNew[level.level])
      .reduce((acc, time) => acc + time, 0);
  
  return promotionTime + newTrainTime;
}

function calculateTotalTargetTimes() {
  const infantryTime = getOneTotalTargetTime(
    state.currentTroopLevels.barracks,
    state.currentTroops.infantry,
    state.targetTroops.infantry,
    state.trainNew.barracks,
    state.promote.barracks);
  if (infantryTime) {
    document.getElementById("target-infantry-time").textContent = toHMS(infantryTime);
  } else {
    document.getElementById("target-infantry-time").textContent = "Target troop nubmers are too low. Cannot compute";
  }
  
  const cavalryTime = getOneTotalTargetTime(
    state.currentTroopLevels.stables,
    state.currentTroops.cavalry,
    state.targetTroops.cavalry,
    state.trainNew.stables,
    state.promote.stables);
  if (cavalryTime) {
    document.getElementById("target-cavalry-time").textContent = toHMS(cavalryTime);
  } else {
    document.getElementById("target-cavalry-time").textContent = "Target troop nubmers are too low. Cannot compute";
  }
  
  const archersTime = getOneTotalTargetTime(
    state.currentTroopLevels.range,
    state.currentTroops.archers,
    state.targetTroops.archers,
    state.trainNew.range,
    state.promote.range);
  if (archersTime) {
    document.getElementById("target-archers-time").textContent = toHMS(archersTime);
  } else {
    document.getElementById("target-archers-time").textContent = "Target troop nubmers are too low. Cannot compute";
  }
  
  const totalTime = Math.max((infantryTime || 0), (cavalryTime || 0), (archersTime || 0));
  document.getElementById("target-all-time").textContent = toHMS(totalTime);
}

function calculateTotalTimes() {
  calculateTotalPromoteTimes();
  calculateTotalTargetTimes();
}

function setUpListeners() {
  document.getElementById("all-buildings-same").addEventListener('change', toggleInputs);
  document.getElementById("all-buildings-level").addEventListener('change', processAllLevel);
  document.getElementById("barracks-level").addEventListener('change', processLevel);
  document.getElementById("stables-level").addEventListener('change', processLevel);
  document.getElementById("range-level").addEventListener('change', processLevel);

  bonusSpeeds.forEach(el => {
    document.getElementById(el).addEventListener('change', processBonusSpeed);
  });

  bonusCapacities.forEach(el => {
    document.getElementById(el).addEventListener('change', processBonusCapacity);
  });
  
  document.getElementById("current-troops").addEventListener('change', processTroopInputNumbersChange);
  document.getElementById("target-troops").addEventListener('change', processTroopTargetNumbersChange);
}

document.addEventListener("DOMContentLoaded", (event) => {
  setUpListeners();
  loadStateFromLocalStorage();
  updateAllTrainingLists();
  loadTroopNumbers();
  hideTroopLevels();
  calculateTotalTimes();
});