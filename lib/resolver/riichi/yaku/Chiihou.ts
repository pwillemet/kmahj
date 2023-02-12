import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { RoundProps, WINNING_KIND } from '../riichi.model'

export const Chiihou: MixedYaku = {
  name: "Chiihou",
  checker: (_, roundProps) => (roundProps?.firstTurn && roundProps?.winningKind === WINNING_KIND.TSUMO) ?? false
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Chiihou", () => {
    const result = Chiihou.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.TSUMO, firstTurn: true } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Chiihou", () => {
    const result = Chiihou.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.TSUMO } as RoundProps);
    expect(result).toBeFalsy();
  })
}
