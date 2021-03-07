export const getDateStr = () => {
  const d = new Date();
  const Y = d.getFullYear();
  const M = (d.getMonth() + 1).toString().padStart(2, "0");
  const D = d.getDate().toString().padStart(2, "0");
  const s = `${Y}-${M}-${D}`;
  return s;
};
