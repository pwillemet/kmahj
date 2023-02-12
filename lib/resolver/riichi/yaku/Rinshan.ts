import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { RoundProps, WINNING_KIND } from '../riichi.model'

export const Rinshan: MixedYaku = {
  name: "Rinshan Kaihou",
  checker: (_, roundProps) => {
    return roundProps?.winningKind === WINNING_KIND.RINSHAN;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Rinshan", () => {
    const result = Rinshan.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.RINSHAN } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Rinshan", () => {
    const result = Rinshan.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.RON } as RoundProps);
    expect(result).toBeFalsy();
  })
}
