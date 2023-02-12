import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { RoundProps, WINNING_KIND } from '../riichi.model'

export const Renhou: MixedYaku = {
  name: "Renhou",
  checker: (_, roundProps) => {
    return (roundProps?.firstTurn && roundProps?.winningKind === WINNING_KIND.RON) ?? false;
  }
}


if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Renhou", () => {
    const result = Renhou.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.RON, firstTurn: true } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Renhou", () => {
    const result = Renhou.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.TSUMO, firstTurn: false } as RoundProps);
    expect(result).toBeFalsy();
  })
}
