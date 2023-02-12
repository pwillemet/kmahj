import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { RoundProps, WINNING_KIND } from '../riichi.model'

export const Haitei: MixedYaku = {
  name: "Haitei",
  checker: (_, roundProps) => {
    return (roundProps?.winningKind === WINNING_KIND.TSUMO || roundProps?.winningKind === WINNING_KIND.RINSHAN) && roundProps?.lastTile;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Haitei", () => {
    const result = Haitei.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.TSUMO, lastTile: true } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Haitei", () => {
    const result = Haitei.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.RON, lastTile: true } as RoundProps);
    expect(result).toBeFalsy();
  })
}
