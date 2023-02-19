export type JapaneseModificator = "^" | ">" | "<" | "v" | "*";
export const JapaneseModificator = {
  AKA: '*' as JapaneseModificator, INCLINED1: '>' as JapaneseModificator,  INCLINED2: '<' as JapaneseModificator, SUPERPOSED: '^' as JapaneseModificator, REVERTED: "v" as JapaneseModificator
};
