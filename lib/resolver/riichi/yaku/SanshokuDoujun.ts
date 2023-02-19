import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const SanshokuDoujun: ClassicYaku = {
  name: "Sanshoku Doujun",
  checker: groups => {
    const sequences = groups.filter(g => g.type === GroupType.SEQUENCE);
    if (sequences.length < 3) return false;
    const firstTileCodes = sequences
      .map(s => Math.min(...s.tiles.map(t => t.tile.code)))
      .sort((a, b) => a - b);
    // case: the three first sequences do sanshoku [ SEQ1, SEQ2, SEQ3, X, D ]
    if (firstTileCodes[1] === firstTileCodes[0] + 10 && firstTileCodes[2] === firstTileCodes[0] + 20) return true;
    if (firstTileCodes.length === 3) return false;
    // case: the three last sequences do sanshoku [ SEQX, SEQ1, SEQ2, SEQ3, D ]
    return firstTileCodes[2] === firstTileCodes[1] + 10 && firstTileCodes[3] === firstTileCodes[1] + 20;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Sanshoku Doujun", () => {
    const input = "234s 234p 234m 888s 66z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = SanshokuDoujun.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Sanshoku Doujun", () => {
    const input = "234s 234s 234m 999s 66z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = SanshokuDoujun.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
