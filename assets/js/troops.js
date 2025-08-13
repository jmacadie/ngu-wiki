import { toHMS, roundPcnt, formatNumberForWrite } from './utils.js';

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

const training_cost = {
  infantry: [
    {
      level: 10,
      bread: 2788,
      wood: 2091,
      stone: 488,
      iron: 102
    },
    {
      level: 9,
      bread: 1394,
      wood: 1046,
      stone: 244,
      iron: 51
    },
    {
      level: 8,
      bread: 558,
      wood: 419,
      stone: 98,
      iron: 21
    },
    {
      level: 7,
      bread: 279,
      wood: 210,
      stone: 49,
      iron: 11
    },
    {
      level: 6,
      bread: 186,
      wood: 140,
      stone: 33,
      iron: 7
    },
    {
      level: 5,
      bread: 156,
      wood: 117,
      stone: 27,
      iron: 6
    },
    {
      level: 4,
      bread: 120,
      wood: 90,
      stone: 21,
      iron: 5
    },
    {
      level: 3,
      bread: 92,
      wood: 69,
      stone: 17,
      iron: 4
    },
    {
      level: 2,
      bread: 58,
      wood: 44,
      stone: 10,
      iron: 3
    },
    {
      level: 1,
      bread: 36,
      wood: 27,
      stone: 7,
      iron: 2
    }
  ],
  cavalry: [
    {
      level: 10,
      bread: 2440,
      wood: 2301,
      stone: 474,
      iron: 109
    },
    {
      level: 9,
      bread: 1220,
      wood: 1151,
      stone: 237,
      iron: 55
    },
    {
      level: 8,
      bread: 488,
      wood: 461,
      stone: 95,
      iron: 22
    },
    {
      level: 7,
      bread: 244,
      wood: 231,
      stone: 48,
      iron: 11
    },
    {
      level: 6,
      bread: 163,
      wood: 154,
      stone: 32,
      iron: 8
    },
    {
      level: 5,
      bread: 136,
      wood: 129,
      stone: 27,
      iron: 7
    },
    {
      level: 4,
      bread: 105,
      wood: 99,
      stone: 21,
      iron: 5
    },
    {
      level: 3,
      bread: 81,
      wood: 76,
      stone: 16,
      iron: 4
    },
    {
      level: 2,
      bread: 51,
      wood: 48,
      stone: 10,
      iron: 3
    },
    {
      level: 1,
      bread: 32,
      wood: 30,
      stone: 7,
      iron: 2
    }
  ],
  archers: [
    {
      level: 10,
      bread: 1740,
      wood: 2579,
      stone: 433,
      iron: 140
    },
    {
      level: 9,
      bread: 872,
      wood: 1290,
      stone: 217,
      iron: 70
    },
    {
      level: 8,
      bread: 349,
      wood: 516,
      stone: 87,
      iron: 28
    },
    {
      level: 7,
      bread: 175,
      wood: 258,
      stone: 44,
      iron: 14
    },
    {
      level: 6,
      bread: 117,
      wood: 173,
      stone: 29,
      iron: 10
    },
    {
      level: 5,
      bread: 97,
      wood: 144,
      stone: 24,
      iron: 8
    },
    {
      level: 4,
      bread: 75,
      wood: 111,
      stone: 19,
      iron: 6
    },
    {
      level: 3,
      bread: 58,
      wood: 86,
      stone: 15,
      iron: 5
    },
    {
      level: 2,
      bread: 36,
      wood: 54,
      stone: 9,
      iron: 4
    },
    {
      level: 1,
      bread: 23,
      wood: 34,
      stone: 6,
      iron: 2
    }
  ]
};

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
  },
  {
    level: 31,
    baseSpeed: 0.080,
    baseCapacity: 214
  },
  {
    level: 32,
    baseSpeed: 0.080,
    baseCapacity: 219
  },
  {
    level: 33,
    baseSpeed: 0.080,
    baseCapacity: 224
  },
  {
    level: 34,
    baseSpeed: 0.080,
    baseCapacity: 229
  },
  {
    level: 35,
    baseSpeed: 0.083,
    baseCapacity: 234
  },
  {
    level: 36,
    baseSpeed: 0.083,
    baseCapacity: 239
  },
  {
    level: 37,
    baseSpeed: 0.083,
    baseCapacity: 244
  },
  {
    level: 38,
    baseSpeed: 0.083,
    baseCapacity: 249
  },
  {
    level: 39,
    baseSpeed: 0.083,
    baseCapacity: 254
  },
  {
    level: 40,
    baseSpeed: 0.086,
    baseCapacity: 259
  },
  {
    level: 41,
    baseSpeed: 0.086,
    baseCapacity: 264
  },
  {
    level: 42,
    baseSpeed: 0.086,
    baseCapacity: 269
  },
  {
    level: 43,
    baseSpeed: 0.086,
    baseCapacity: 274
  },
  {
    level: 44,
    baseSpeed: 0.086,
    baseCapacity: 279
  },
  {
    level: 45,
    baseSpeed: 0.089,
    baseCapacity: 284
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
  updateTrainingList('training-body-all', state.all, "all");
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

function copyAllState() {
  const types = ["infantry", "cavalry", "archers", "total"];
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "total"];
  
  types.forEach(t => {
    levels.forEach(l => state.targetTroops[t][l] = state.currentTroops[t][l])
  })
}

function processCopyTroops(e) {
  e.preventDefault();
  
  copyAllState();
  loadTroopNumbers();
  calculateTotalTargetTimes();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function promoteAllState(troop, building) {
  const level = state.currentTroopLevels[building];
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(l => {
    if (l === level) {
      state.targetTroops[troop][l] = state.currentTroops[troop].total;
    } else {
      state.targetTroops[troop][l] = 0;
    }
  })
}

function processCopyPromoteTroops(e) {
  e.preventDefault();
  
  copyAllState();
  promoteAllState("infantry", "barracks");
  promoteAllState("cavalry", "stables");
  promoteAllState("archers", "range");
  
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(l => {
    state.targetTroops.total[l] = state.targetTroops.infantry[l] +
                                  state.targetTroops.cavalry[l] +
                                  state.targetTroops.archers[l];
  })
  
  loadTroopNumbers();
  calculateTotalTargetTimes();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function add1kState(troop, building) {
  const level = state.currentTroopLevels[building];
  const start = state.targetTroops[troop][level];
  const rounded = Math.floor(start / 1000 + Number.EPSILON) * 1000;
  const updated = rounded + 1000;
  const delta = updated - start;
  
  state.targetTroops[troop][level] = updated;
  state.targetTroops.total[level] += delta;
  state.targetTroops[troop].total += delta;
  state.targetTroops.total.total += delta;
}

function processAdd1k(e) {
  e.preventDefault();
  switch (e.target.id) {
    case "infantry1k":
      add1kState("infantry", "barracks");
      break;
    case "cavalry1k":
      add1kState("cavalry", "stables");
      break;
    case "archers1k":
      add1kState("archers", "range");
      break;
  }
  
  loadTroopNumbers();
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

function calculateOnePromote(currentTroops, currentLevel, promoteTimes, training_costs) {
  const currentLevelCost = training_costs.find(obj => obj.level === currentLevel);
  const baseCosts = {
    time: 0,
    bread: 0,
    wood: 0,
    stone: 0,
    iron: 0
  };
  if (currentLevelCost) {
    return Object.keys(currentTroops)
            .filter(k => Number(k) < currentLevel)
            .map(level => {
              const fromLevelCost = training_costs.find(obj => obj.level === Number(level));
              if (!fromLevelCost) {
                return baseCosts;
              }
              return {
                time: currentTroops[level] * promoteTimes[level],
                bread: currentTroops[level] * (currentLevelCost.bread - fromLevelCost.bread),
                wood: currentTroops[level] * (currentLevelCost.wood - fromLevelCost.wood),
                stone: currentTroops[level] * (currentLevelCost.stone - fromLevelCost.stone),
                iron: currentTroops[level] * (currentLevelCost.iron - fromLevelCost.iron)
              };
            })
            .reduce((acc, costs) => {
              return {
                time: acc.time + costs.time,
                bread: acc.bread + costs.bread,
                wood: acc.wood + costs.wood,
                stone: acc.stone + costs.stone,
                iron: acc.iron + costs.iron
              };
            }, baseCosts);
  }
}

function writeResults(type, troop, costs) {
  if (costs.time > 0) {
    document.getElementById(`${type}-${troop}-time`).textContent = toHMS(costs.time);
    document.getElementById(`${type}-${troop}-bread`).textContent = formatNumberForWrite(costs.bread);
    document.getElementById(`${type}-${troop}-wood`).textContent = formatNumberForWrite(costs.wood);
    document.getElementById(`${type}-${troop}-stone`).textContent = formatNumberForWrite(costs.stone);
    document.getElementById(`${type}-${troop}-iron`).textContent = formatNumberForWrite(costs.iron);
  } else {
    document.getElementById(`${type}-${troop}-time`).textContent = "Nothing to promote";
    document.getElementById(`${type}-${troop}-bread`).textContent = "-";
    document.getElementById(`${type}-${troop}-wood`).textContent = "-";
    document.getElementById(`${type}-${troop}-stone`).textContent = "-";
    document.getElementById(`${type}-${troop}-iron`).textContent = "-";
  }
}

function calculateTotalPromoteTimes() {
  const infantryCosts = calculateOnePromote (
    state.currentTroops.infantry,
    state.currentTroopLevels.barracks,
    state.promote.barracks,
    training_cost.infantry
  );
  writeResults("promote", "infantry", infantryCosts);

  const cavalryCosts = calculateOnePromote (
    state.currentTroops.cavalry,
    state.currentTroopLevels.stables,
    state.promote.stables,
    training_cost.cavalry
  );
  writeResults("promote", "cavalry", cavalryCosts);

  const archersCosts = calculateOnePromote (
    state.currentTroops.archers,
    state.currentTroopLevels.range,
    state.promote.range,
    training_cost.archers
  );
  writeResults("promote", "archers", archersCosts);

  const maxTime = Math.max(infantryCosts.time, cavalryCosts.time, archersCosts.time);
  const allCosts = {
    time: maxTime,
    bread: infantryCosts.bread + cavalryCosts.bread + archersCosts.bread,
    wood: infantryCosts.wood + cavalryCosts.wood + archersCosts.wood,
    stone: infantryCosts.stone + cavalryCosts.stone + archersCosts.stone,
    iron: infantryCosts.iron + cavalryCosts.iron + archersCosts.iron
  };
  writeResults("promote", "all", allCosts);
  
  const speedUpTime = infantryCosts.time + cavalryCosts.time + archersCosts.time;
  if (speedUpTime > 0) {
    document.getElementById("promote-speedup-time").textContent = toHMS(speedUpTime);
  } else {
    document.getElementById("promote-speedup-time").textContent = "Nothing to promote";
  }
}

function calculatePromoteForTarget(promotions, currentLevel, times, training_costs) {
  const currentLevelCost = training_costs.find(obj => obj.level === currentLevel);
  const baseCosts = {
    time: 0,
    bread: 0,
    wood: 0,
    stone: 0,
    iron: 0
  };
  if (currentLevelCost) {
    return promotions
           .map(level => {
              const fromLevelCost = training_costs.find(obj => obj.level === Number(level.level));
              if (!fromLevelCost) {
                return baseCosts;
              }
              return {
                time: level.promotions * times[level.level],
                bread: level.promotions * (currentLevelCost.bread - fromLevelCost.bread),
                wood: level.promotions * (currentLevelCost.wood - fromLevelCost.wood),
                stone: level.promotions * (currentLevelCost.stone - fromLevelCost.stone),
                iron: level.promotions * (currentLevelCost.iron - fromLevelCost.iron)
              };
            })
            .reduce((acc, costs) => {
              return {
                time: acc.time + costs.time,
                bread: acc.bread + costs.bread,
                wood: acc.wood + costs.wood,
                stone: acc.stone + costs.stone,
                iron: acc.iron + costs.iron
              };
            }, baseCosts);
  }
}

function calculateNewTrainForTarget(troops, times, training_costs) {
  const baseCosts = {
    time: 0,
    bread: 0,
    wood: 0,
    stone: 0,
    iron: 0
  };
  return troops
         .map(level => {
            const levelCost = training_costs.find(obj => obj.level === Number(level.level));
            if (!levelCost) {
              return baseCosts;
            }
            return {
              time: level.newTroops * times[level.level],
              bread: level.newTroops * levelCost.bread,
              wood: level.newTroops * levelCost.wood,
              stone: level.newTroops * levelCost.stone,
              iron: level.newTroops * levelCost.iron
            };
          })
          .reduce((acc, costs) => {
            return {
              time: acc.time + costs.time,
              bread: acc.bread + costs.bread,
              wood: acc.wood + costs.wood,
              stone: acc.stone + costs.stone,
              iron: acc.iron + costs.iron
            };
          }, baseCosts);
}

function getOneTotalTargetTime(currentLevel, currentNum, targetNum, trainNew, promote, training_costs) {
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
  
  const promotionCosts = calculatePromoteForTarget(promotions, currentLevel, promote, training_costs);
  const newTrainCosts = calculateNewTrainForTarget(newTroops, trainNew, training_costs);

  return {
    time: promotionCosts.time + newTrainCosts.time,
    bread: promotionCosts.bread + newTrainCosts.bread,
    wood: promotionCosts.wood + newTrainCosts.wood,
    stone: promotionCosts.stone + newTrainCosts.stone,
    iron: promotionCosts.iron + newTrainCosts.iron,
  };
}

function calculateTotalTargetTimes() {
  const infantryCosts = getOneTotalTargetTime(
    state.currentTroopLevels.barracks,
    state.currentTroops.infantry,
    state.targetTroops.infantry,
    state.trainNew.barracks,
    state.promote.barracks,
    training_cost.infantry);
  writeResults("target", "infantry", infantryCosts);

  const cavalryCosts = getOneTotalTargetTime(
    state.currentTroopLevels.stables,
    state.currentTroops.cavalry,
    state.targetTroops.cavalry,
    state.trainNew.stables,
    state.promote.stables,
    training_cost.cavalry);
  writeResults("target", "cavalry", cavalryCosts);

  const archersCosts = getOneTotalTargetTime(
    state.currentTroopLevels.range,
    state.currentTroops.archers,
    state.targetTroops.archers,
    state.trainNew.range,
    state.promote.range,
    training_cost.archers);
  writeResults("target", "archers", archersCosts);

  const maxTime = Math.max(infantryCosts.time, cavalryCosts.time, archersCosts.time);
  const allCosts = {
    time: maxTime,
    bread: infantryCosts.bread + cavalryCosts.bread + archersCosts.bread,
    wood: infantryCosts.wood + cavalryCosts.wood + archersCosts.wood,
    stone: infantryCosts.stone + cavalryCosts.stone + archersCosts.stone,
    iron: infantryCosts.iron + cavalryCosts.iron + archersCosts.iron
  };
  writeResults("target", "all", allCosts);
  
  const speedUpTime = infantryCosts.time + cavalryCosts.time + archersCosts.time;
  if (speedUpTime > 0) {
    document.getElementById("target-speedup-time").textContent = toHMS(speedUpTime);
  } else {
    document.getElementById("target-speedup-time").textContent = "Nothing to promote";
  }
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
  
  document.getElementById("copy").addEventListener('click', processCopyTroops);
  document.getElementById("copy-promote").addEventListener('click', processCopyPromoteTroops);
  document.getElementById("infantry1k").addEventListener('click', processAdd1k);
  document.getElementById("cavalry1k").addEventListener('click', processAdd1k);
  document.getElementById("archers1k").addEventListener('click', processAdd1k);
}

document.addEventListener("DOMContentLoaded", (event) => {
  setUpListeners();
  loadStateFromLocalStorage();
  updateAllTrainingLists();
  loadTroopNumbers();
  hideTroopLevels();
  calculateTotalTimes();
});
