import { fibonacci } from "./fibonacci";

export const nth_fibonacci = (n: number, prev = 0, start = 1) => {
  return fibonacci(prev, start, n + 1)[n];
};
