import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Sankantsu: ClassicYaku = {
  name: "Sankantsu",
  checker: groups => {
    const quads = groups.filter(g => g.type === GroupType.QUAD);
    return quads.length === 3;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Sankantsu", () => {
    const input = "234s 2222p 6666s 8888s 66z"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Sankantsu.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Sankantsu", () => {
    const input = "234s 2222p 6666s 999s 66z"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Sankantsu.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
