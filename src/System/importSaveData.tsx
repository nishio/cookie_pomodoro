import { setGlobal } from "reactn";

export const importSaveData = () => {
  const s = prompt();
  if (s !== null) {
    const data = JSON.parse(s);
    setGlobal(data);
  }
};
