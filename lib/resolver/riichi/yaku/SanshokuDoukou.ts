import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const SanshokuDoukou: ClassicYaku = {
  name: "Sanshoku Doukou",
  checker: groups => {
    const triplesQuads = groups.filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD);
    if (triplesQuads.length < 3) return false;
    const firstTileCodes = triplesQuads
      .map(g => g.tiles[0].tile.code)
      .sort((a, b) => a - b);
    // case: The three first triples/quads do sanshoku [TQ1, TQ2, TQ3, X, D]
    if (firstTileCodes[1] === firstTileCodes[0] + 10 && firstTileCodes[2] === firstTileCodes[0] + 20) return true;
    if (firstTileCodes.length === 3) return false;
    // case: The three last triples/quads do sanshoku [TQX, TQ1, TQ2, TQ3, D]
    return  firstTileCodes[2] === firstTileCodes[1] + 10 && firstTileCodes[3] === firstTileCodes[2] + 20;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Sanshoku Doukou", () => {
    const input = "222s 222p 222m 789s 66z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = SanshokuDoukou.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Sanshoku Doukou", () => {
    const input = "222s 222p 22m 789s 66z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = SanshokuDoukou.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
