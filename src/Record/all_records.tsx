const dateToStr = (x: unknown) => {
  return new Date(x as number).toLocaleString();
};

export const all_records = [
  {
    id: "firstVisit",
    forHuman: "First Visit",
    toStr: dateToStr,
  },
  {
    id: "lastVisit",
    forHuman: "Last Visit",
    toStr: dateToStr,
  },
  {
    id: "gotPomodoro",
    forHuman: "Got Pomodoro",
    toStr: (x: unknown) => x as number,
  },
];
