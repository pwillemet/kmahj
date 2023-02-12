import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType, isWind } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Daisuushii: ClassicYaku = {
  name: "Daisuushii",
  checker: groups => {
    const windTriplesQuads = groups
      .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
      .filter(g => isWind(g.tiles[0]));
    return windTriplesQuads.length === groups.length - 1;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Daisuushii", () => {
    const input = "111z 222z 3333z 444z 11p"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Daisuushii.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Daisuushii", () => {
    const input = "111z 222z 3333z 44z 111p"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Daisuushii.checker(groups as ClassicHandPattern);expect(result).toBeFalsy();
  })
}
