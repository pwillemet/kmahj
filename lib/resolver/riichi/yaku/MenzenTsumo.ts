import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { MahjongGroupState } from '../../../core'
import { RoundProps, WINNING_KIND } from '../riichi.model'

export const MenzenTsumo: MixedYaku = {
  name: "Menzen Tsumo",
  checker: (groups, roundProps) =>
    groups.every(g => g.state === MahjongGroupState.HIDDEN) && roundProps?.winningKind === WINNING_KIND.TSUMO,
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Menzen Tsummo", () => {
    const result = MenzenTsumo.checker([{ state: MahjongGroupState.HIDDEN}] as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.TSUMO } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Menzen Tsumo", () => {
    const result = MenzenTsumo.checker([{ state: MahjongGroupState.OPEN}] as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.RON } as RoundProps);
    expect(result).toBeFalsy();
  })
}
