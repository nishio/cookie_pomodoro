export const fibonacci = (prev: number, start: number, length: number) => {
  const ret = [start];
  let current = start;
  while (ret.length < length) {
    let next = prev + current;
    ret.push(next);
    prev = current;
    current = next;
  }
  return ret;
};
