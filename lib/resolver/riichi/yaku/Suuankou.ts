import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType, isWinningTile, MahjongGroupState } from '../../../core'
import { WINNING_KIND } from '../riichi.model'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Suuankou: ClassicYaku = {
  name: "Suuankou",
  checker: (groups, roundProps) => {
    const triplesQuads = groups
      .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
      .filter(g => g.state === MahjongGroupState.HIDDEN);
    if (triplesQuads.length < groups.length - 1) return false;
    return roundProps?.winningKind === WINNING_KIND.TSUMO ||
      roundProps?.winningKind === WINNING_KIND.RINSHAN ||
      groups.find(g => g.type === GroupType.DOUBLE)!.tiles.some(t => isWinningTile(t));
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Suuankou", () => {
    const input = "6z 222s 333s 666s 888s +6z"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Suuankou.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Suuankou", () => {
    const input = "22s 333s 666s 999s 66z+2s"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Suuankou.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
