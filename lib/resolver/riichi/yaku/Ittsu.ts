import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Ittsu: ClassicYaku = {
  name: "Ittsu",
  checker: groups => {
    const sequences = groups.filter(g => g.type === GroupType.SEQUENCE);
    if (sequences.length < 3) return false;
    const firstTileCodes = sequences.map(s => s.tiles[0].tile.code);
    // case: the three first sequences do Ittsu [ SEQ1, SEQ2, SEQ3, X, D ]
    if (firstTileCodes[0] % 10 === 1 && firstTileCodes[1] === firstTileCodes[0] + 3 && firstTileCodes[2] === firstTileCodes[1] + 3) return true;
    if (firstTileCodes.length === 3) return false;
    // case: the three last sequences do Ittsu [ SEQX, SEQ1, SEQ2, SEQ3, D ]
    return firstTileCodes[1] % 10 === 1 && firstTileCodes[2] === firstTileCodes[1] + 3 && firstTileCodes[3] === firstTileCodes[2] + 3;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Ittsu", () => {
    const input = "123p 456p 789p 777s 11z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Ittsu.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Ittsu", () => {
    const input = "111p 234p 567m 888p 99p 11z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Ittsu.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
