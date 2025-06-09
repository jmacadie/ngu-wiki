export function toHMS(seconds) {
  const MIN = 60;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;
  const d = Math.floor(seconds / DAY);
  const h = Math.floor((seconds % DAY) / HOUR);
  const m = Math.floor((seconds % HOUR) / MIN);
  const s = seconds % MIN;
  let out = "";
  if (d !== 0) {
	out += `${d}d `;
  }
  if (h !== 0) {
	out += `${h}h `;
  }
  if (m !== 0) {
	out += `${m}m `;
  }
  if (s !== 0) {
	out += `${s}s `;
  }
  return out;
}

export function formatPcnt(val) {
  const grossed = val * 100;
  const rounded = Math.round(grossed * 100) / 100;
  return String(rounded) + '%';
}