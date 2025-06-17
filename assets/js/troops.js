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
      "10": 0
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
      "10": 0
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
      "10": 0
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
      "10": 0
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
      "10": 0
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
      "10": 0
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
      loadStateFromParsedSecion(state.currentTroops.infantry, parsed.currentTroops.infantry);
      loadStateFromParsedSecion(state.currentTroops.cavalry, parsed.currentTroops.cavalry);
      loadStateFromParsedSecion(state.currentTroops.archers, parsed.currentTroops.archers);
      loadStateFromParsedSecion(state.targetTroops.infantry, parsed.targetTroops.infantry);
      loadStateFromParsedSecion(state.targetTroops.cavalry, parsed.targetTroops.cavalry);
      loadStateFromParsedSecion(state.targetTroops.archers, parsed.targetTroops.archers);
      loadAllBuildingInputs();
    } catch (e) {
      console.warn('Failed to parse saved inputs:', e);
    }
  }
}

function loadStateFromParsedSecion(s, p) {
  for (const key of Object.keys(s)) {
    s[key] = p[key];
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
  if (el.checked) {
    allInputs.classList.add("show-inputs");
    allInputs.classList.remove("hide-inputs");
    sepInputs.classList.remove("show-inputs");
    sepInputs.classList.add("hide-inputs");
  } else {
    allInputs.classList.remove("show-inputs");
    allInputs.classList.add("hide-inputs");
    sepInputs.classList.add("show-inputs");
    sepInputs.classList.remove("hide-inputs");
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
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateTrainingList();
}

function processLevel(e) {
  const building = buildingType(e.target.id);
  const level = Number(e.target.value);
  processInner(building, level);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateTrainingList();
}

function processBonusSpeed(e) {
  const amount = Number(e.target.value);
  const pcnt = amount / 100;
  bonusSpeeds.forEach(el => {
    document.getElementById(el).value = amount;
    updateState(el, pcnt);
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateTrainingList();
}

function processBonusCapacity(e) {
  const amount = Number(e.target.value);
  bonusCapacities.forEach(el => {
    document.getElementById(el).value = amount;
    updateState(el, amount);
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateTrainingList();
}

function calculateTrainingTimes(level, capacity, speed) {
  const raw = training_data
            .filter(data => data.minTCLevel <= level)
            .map(data => {
              const time = data.time * capacity / (1 + speed);
              return {
                "level": data.level,
                "time": time
              }
            });
  
  const last = raw.at(-1);
  if (last) {
    const maxLevelTime = last.time;
    return raw.map(data => {
      if (data.level === last.level) {
        return {
          "level": data.level,
          "time": data.time,
          "fullPromoteNum": null,
          "fullPromoteTime": null
        };
      }
      
      const additionalTime = maxLevelTime - data.time;
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

function renderTrainingRow(group) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>Level ${group.level}</td>
    <td>${state.all.capacity}</td>
    <td>${toHMS(group.time)}</td>
    <td>${group.fullPromoteNum}</td>
    <td>${toHMS(group.fullPromoteTime)}</td>
  `;
  return tr;
}

function updateTrainingList() {
  const tbody = document.getElementById('training-body');
  tbody.innerHTML = '';

  const times = calculateTrainingTimes(state.all.level, state.all.capacity, state.all.speed);
  if (times) {
    for (const g of times) tbody.appendChild(renderTrainingRow(g));
  }
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
}

document.addEventListener("DOMContentLoaded", (event) => {
  setUpListeners();
  loadStateFromLocalStorage();
  updateTrainingList();
});

