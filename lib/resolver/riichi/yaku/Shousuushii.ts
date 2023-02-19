import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType, isWind } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Shousuushii: ClassicYaku = {
  name: "Shousuushii",
  checker: groups => {
    const doubleTile = groups.find(g => g.type === GroupType.DOUBLE)!.tiles[0];
    if (!isWind(doubleTile)) return false;
    const windTriplesQuads = groups
      .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
      .filter(g => isWind(g.tiles[0]));
    return windTriplesQuads.length === 3;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Shousuushii", () => {
    const input = "234s 111z 222z 333z 44z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Shousuushii.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Shousuushii", () => {
    const input = "234s 111z 222z 333z 66z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Shousuushii.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
