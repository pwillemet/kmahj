import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { RoundProps, WINNING_KIND } from '../riichi.model'

export const Houtei: MixedYaku = {
  name: "Houtei",
  checker: (_, roundProps) => {
    return (roundProps?.winningKind === WINNING_KIND.RON && roundProps?.lastTile) ?? false;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Houtei", () => {
    const result = Houtei.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.RON, lastTile: true } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Houtei", () => {
    const result = Houtei.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.TSUMO, lastTile: true } as RoundProps);
    expect(result).toBeFalsy();
  })
}
