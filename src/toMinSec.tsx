export const toMinSec = (sec: number) => {
  const minus = sec < 0 ? "-" : "";
  if (sec < 0) {
    sec *= -1;
  }
  const min = Math.floor(sec / 60);
  const s = sec - 60 * min;
  return `${minus}${min}:${s.toString().padStart(2, "0")}`;
};
