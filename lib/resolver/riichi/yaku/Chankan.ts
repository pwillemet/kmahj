import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { RoundProps, WINNING_KIND } from '../riichi.model'

export const Chankan: MixedYaku = {
  name: "Chankan",
  checker: (_, roundProps) => {
    return roundProps?.winningKind === WINNING_KIND.CHANKAN;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Chankan", () => {
    const result = Chankan.checker(null as unknown as ClassicHandPattern, { winningKind: WINNING_KIND.CHANKAN } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Chankan", () => {
    const result = Chankan.checker(null as unknown as ClassicHandPattern, null as unknown as RoundProps);
    expect(result).toBeFalsy();
  })
}

