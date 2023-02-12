import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { RoundProps } from '../riichi.model'

export const Riichi: MixedYaku = {
  name: "Riichi",
  checker: (_, roundProps) => roundProps?.riichi ?? false
}


if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Riichi", () => {
    const result = Riichi.checker(null as unknown as ClassicHandPattern, { riichi: true } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Riichi", () => {
    const result = Riichi.checker(null as unknown as ClassicHandPattern, { riichi: false } as RoundProps);
    expect(result).toBeFalsy();
  })
}
