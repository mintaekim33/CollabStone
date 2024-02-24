// This JavaScript function always returns a random number between min (included) and max (excluded)
export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
