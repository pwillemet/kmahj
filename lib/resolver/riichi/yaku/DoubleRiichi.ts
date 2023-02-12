import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { RoundProps } from '../riichi.model'

export const DoubleRiichi: MixedYaku = {
  name: "Double Riichi",
  checker: (_, roundProps) => roundProps?.doubleRiichi ?? false,
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Double Riichi", () => {
    const result = DoubleRiichi.checker(null as unknown as ClassicHandPattern, { doubleRiichi: true } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Double Riichi", () => {
    const result = DoubleRiichi.checker(null as unknown as ClassicHandPattern, null as unknown as RoundProps);
    expect(result).toBeFalsy();
  })
}
