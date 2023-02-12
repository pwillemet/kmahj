import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType, isDragon } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Shousangen: ClassicYaku = {
  name: "Shousangen",
  checker: groups => {
    const double = groups.find(g => g.type === GroupType.DOUBLE)!;
    if (!isDragon(double.tiles[0])) return false;
    const dragonTriplesQuads = groups
      .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
      .filter(g => isDragon(g.tiles[0]));
    return dragonTriplesQuads.length === 2;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Shousangen", () => {
    const input = "234s 234s 777z 555z 66z"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Shousangen.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Shousangen", () => {
    const input = "234s 234s 777s 555z 66m"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Shousangen.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
