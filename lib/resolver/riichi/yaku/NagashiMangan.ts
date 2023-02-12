import { DiscardYaku } from './yaku.model'
import { isHonor, isTerminal } from '../../../core'
import { RoundProps } from '../riichi.model'
import { MpszParser } from '../../../parser'

export const NagashiMangan: DiscardYaku = {
  name: "Nagashi Mangan",
  checker: (tiles, roundProps) => {
    if (roundProps.discardTouched) return false;
    return tiles.every(t => isTerminal(t) || isHonor(t))
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  const input = "123z19p"
  const parsed = MpszParser(input);
  test("Nagashi Mangan", () => {
    const result = NagashiMangan.checker(parsed.groups[0].tiles, { discardTouched: false } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Not Nagashi Mangan", () => {
    const result = NagashiMangan.checker(parsed.groups[0].tiles, { discardTouched: true } as RoundProps);
    expect(result).toBeFalsy();
  })
}
