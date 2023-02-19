import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Toitoi: ClassicYaku = {
  name: "Toitoi",
  checker: groups => {
    const triplesQuads = groups.filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD);
    return triplesQuads.length === groups.length - 1;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Toitoi", () => {
    const input = "222s 333s 666s 888s 66m"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Toitoi.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Toitoi", () => {
    const input = "123s 333s 666s 888s 66m"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Toitoi.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
