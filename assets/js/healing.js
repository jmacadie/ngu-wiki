const inputIds = [
  'baseAssists', 'researchAssists',
  'baseHelpTime', 'researchHelpTime',
  'alliesOnline'
];

const STORAGE_KEY = 'ngu_healing_inputs';

function saveInputsToLocalStorage() {
  const data = {};
  for (const id of inputIds) {
	const value = document.getElementById(id).value;
	data[id] = value;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadInputsFromLocalStorage() {
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

function toHMS(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h === 0 && m === 0) return `${s}s`;
  if (h === 0 && s === 0) return `${m}m`;
  if (m === 0 && s === 0) return `${h}h`;
  if (h === 0) return `${m}m ${s}s`;
  if (m === 0) return `${h}h ${s}s`;
  if (s === 0) return `${h}h ${m}m`;
  return `${h}h ${m}m ${s}s`;
}

function updateCalculations() {
  const baseAssists = parseInt(document.getElementById('baseAssists').value) || 0;
  const researchAssists = parseInt(document.getElementById('researchAssists').value) || 0;
  const baseHelpTime = parseInt(document.getElementById('baseHelpTime').value) || 0;
  const researchHelpTime = parseInt(document.getElementById('researchHelpTime').value) || 0;
  const alliesOnline = parseInt(document.getElementById('alliesOnline').value) || 0;

  const totalAssists = baseAssists + researchAssists;
  const totalHelpTime = baseHelpTime + researchHelpTime;
  const maxHelp = totalAssists * totalHelpTime;
  const immediateHelp = Math.min(totalAssists, alliesOnline) * totalHelpTime;

  document.getElementById('totalAssists').textContent = totalAssists;
  document.getElementById('totalHelpTime').textContent = toHMS(totalHelpTime);
  document.getElementById('maxHelp').textContent = toHMS(maxHelp);
  document.getElementById('immediateHelp').textContent = toHMS(immediateHelp);

  saveInputsToLocalStorage();
}

document.addEventListener("DOMContentLoaded", (event) => {
  // Set up listeners
  inputIds.forEach(id => {
    document.getElementById(id).addEventListener('input', updateCalculations);
  });

  // Load on page start and run once
  loadInputsFromLocalStorage();
  updateCalculations();
});

