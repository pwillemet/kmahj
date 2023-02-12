export type MpszModificator = "^" | ">" | "<" | "v" | "*";
export const MpszModificator = {
  AKA: '*' as MpszModificator, INCLINED1: '>' as MpszModificator,  INCLINED2: '<' as MpszModificator, SUPERPOSED: '^' as MpszModificator, REVERTED: "v" as MpszModificator
};
export type MpszFamily = "m" | "p" | "s" | "z";
export const MpszFamily = {
  M: "m" as MpszFamily,
  P: "p" as MpszFamily,
  S: "s" as MpszFamily,
  Z: "z" as MpszFamily
}
