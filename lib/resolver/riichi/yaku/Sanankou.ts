import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType, isWinningTile, MahjongGroupState } from '../../../core'
import { WINNING_KIND } from '../riichi.model'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Sanankou: ClassicYaku = {
  name: "Sanankou",
  checker: (groups, roundProps) => {
    const triplesQuads = groups
      .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
      .filter(g => g.state === MahjongGroupState.HIDDEN);
    if(triplesQuads.length < groups.length - 2) return false;
    return roundProps?.winningKind === WINNING_KIND.TSUMO ||
      roundProps?.winningKind === WINNING_KIND.RINSHAN ||
      triplesQuads.map(g => g.tiles).flat().every(t => !isWinningTile(t));
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Sanankou", () => {
    const input = "222s 234s 666s 888s 66z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Sanankou.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Sanankou", () => {
    const input = "22s 234s 666s 999s 66z+2s"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Sanankou.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
