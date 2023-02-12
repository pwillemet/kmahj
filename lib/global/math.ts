export function roundUp(input: number, toNext: number) {
  return Math.ceil(input / toNext) * toNext;
}
