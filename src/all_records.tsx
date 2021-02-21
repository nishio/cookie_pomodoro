export const all_records = [
  {
    id: "lastVisit",
    forHuman: "Last Visit",
    toStr: (x: unknown) => new Date(x as number).toLocaleString(),
  },
];
