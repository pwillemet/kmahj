import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { RoundProps } from '../riichi.model'

export const Ippatsu: MixedYaku = {
  name: "Ippatsu",
  checker: (_, roundProps) => {
    if (roundProps == null) return false;
    return roundProps.riichi && roundProps.firstTurnAfterRiichi
  },
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Ippatsu", () => {
    const result = Ippatsu.checker(null as unknown as ClassicHandPattern, { riichi: true, firstTurnAfterRiichi: true } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Ippatsu", () => {
    const result = Ippatsu.checker(null as unknown as ClassicHandPattern, { riichi: true, firstTurnAfterRiichi: false } as RoundProps);
    expect(result).toBeFalsy();
  })
}
