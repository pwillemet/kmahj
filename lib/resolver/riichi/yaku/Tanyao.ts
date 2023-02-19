import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { isOrdinary } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Tanyao: MixedYaku = {
  name: "Tanyao",
  checker: (groups) =>
    groups.map((g) => g.tiles).flat().every(tile => isOrdinary(tile))
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Tanyao", () => {
    const input = "234s 333s 666s 888s 66m"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Tanyao.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Tanyao", () => {
    const input = "123s 333s 666s 888s 66m"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Tanyao.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
