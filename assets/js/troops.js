import { toHMS, roundPcnt } from './utils.js';

const training_data = [
  {
	  level: 1,
	  power: 3,
	  time: 12
  },
  {
	  level: 2,
	  power: 4,
	  time: 17
  },
  {
	  level: 3,
	  power: 6,
	  time: 24
  },
  {
	  level: 4,
	  power: 9,
	  time: 32
  },
  {
	  level: 5,
	  power: 13,
	  time: 44
  },
  {
	  level: 6,
	  power: 20,
	  time: 60
  },
  {
	  level: 7,
	  power: 28,
	  time: 83
  },
  {
	  level: 8,
	  power: 38,
	  time: 113
  },
  {
	  level: 9,
	  power: 50,
	  time: 131
  },
  {
	  level: 10,
	  power: 66,
	  time: 152
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
      const data = JSON.parse(saved);
      for (const id of inputIds) {
        if (id in data) {
          document.getElementById(id).value = data[id];
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved inputs:', e);
    }
  }
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

function setBonusSpeeds(amount) {
  const pcnt = amount / 100;
  ["all-buildings-bonus-speed", "barracks-bonus-speed", "stables-bonus-speed", "range-bonus-speed"].forEach(el => {
    document.getElementById(el).value = amount;
    updateState(el, pcnt);
  });
}

function setBonusCapacity(amount) {
  ["all-buildings-bonus-capacity", "barracks-bonus-capacity", "stables-bonus-capacity", "range-bonus-capacity"].forEach(el => {
    document.getElementById(el).value = amount;
    updateState(el, amount);
  });
}

function toggleInputs(el) {
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

function calculateTrainingTimes() {
  return 0;
}

document.addEventListener("DOMContentLoaded", (event) => {
  // Set up listeners
  document.getElementById("all-buildings-same").addEventListener('change', e => {
    toggleInputs(e.target);
  });

  document.getElementById("all-buildings-level").addEventListener('change', e => {
    const level = Number(e.target.value);
    setBaseSpeed("all-buildings-base-speed", level);
    setBaseCapacity("all-buildings-base-capacity", level);
    updateState("all-buildings-level", level);

    document.getElementById("barracks-level").value = level;
    setBaseSpeed("barracks-base-speed", level);
    setBaseCapacity("barracks-base-capacity", level);
    updateState("barracks-level", level);
    document.getElementById("stables-level").value = level;
    setBaseSpeed("stables-base-speed", level);
    setBaseCapacity("stables-base-capacity", level);
    updateState("stables-level", level);
    document.getElementById("range-level").value = level;
    setBaseSpeed("range-base-speed", level);
    setBaseCapacity("range-base-capacity", level);
    updateState("range-level", level);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });

  document.getElementById("barracks-level").addEventListener('change', e => {
    const level = Number(e.target.value);
    setBaseSpeed("barracks-base-speed", level);
    setBaseCapacity("barracks-base-capacity", level);
    updateState("barracks-level", level);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });

  document.getElementById("stables-level").addEventListener('change', e => {
    const level = Number(e.target.value);
    setBaseSpeed("stables-base-speed", level);
    setBaseCapacity("stables-base-capacity", level);
    updateState("stables-level", level);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });

  document.getElementById("range-level").addEventListener('change', e => {
    const level = Number(e.target.value);
    setBaseSpeed("range-base-speed", level);
    setBaseCapacity("range-base-capacity", level);
    updateState("range-level", level);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });

  ["all-buildings-bonus-speed", "barracks-bonus-speed", "stables-bonus-speed", "range-bonus-speed"].forEach(el => {
    document.getElementById(el).addEventListener('change', e => {
      const amount = Number(e.target.value);
      setBonusSpeeds(amount);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    });
  });

  ["all-buildings-bonus-capacity", "barracks-bonus-capacity", "stables-bonus-capacity", "range-bonus-capacity"].forEach(el => {
    document.getElementById(el).addEventListener('change', e => {
      const amount = Number(e.target.value);
      setBonusCapacity(amount);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    });
  });

  // Load on page start and run once

});

