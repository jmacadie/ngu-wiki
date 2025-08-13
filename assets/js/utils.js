export function toHMS(seconds) {
  const MIN = 60;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;
  const d = Math.floor(seconds / DAY);
  const h = Math.floor((seconds % DAY) / HOUR);
  const m = Math.floor((seconds % HOUR) / MIN);
  const s = Math.floor(seconds % MIN);
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
  return out.slice(0, -1);
}

export function roundPcnt(val) {
  return Math.round(val * 100 * 100) / 100;
}

export function formatPcnt(val) {
  return String(roundPcnt(val)) + '%';
}

export function formatNumberForWrite(num) {
  let reduced;
  let rounded;
  
  if (num > 1000000000) {
    reduced = num / 1000000000;
    rounded = Math.round(reduced * 100) / 100;
    return rounded.toLocaleString() + 'b';
  }
  
  if (num > 1000000) {
    reduced = num / 1000000;
    rounded = Math.round(reduced * 100) / 100;
    return rounded.toLocaleString() + 'm';
  }
  
  if (num > 1000) {
    reduced = num / 1000;
    rounded = Math.round(reduced * 100) / 100;
    return rounded.toLocaleString() + 'k';
  }
  
  rounded = Math.round(num * 100) / 100;
  return rounded.toLocaleString();
}