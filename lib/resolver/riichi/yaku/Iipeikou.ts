import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import {
  GroupType,
  MahjongGroupState,
} from '../../../core'
import { Ryanpeikou } from './Ryanpeikou'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Iipeikou: ClassicYaku = {
  name: "Iipeikou",
  checker: (groups) => {
    if (groups.some(g => g.state === MahjongGroupState.OPEN)) return false;
    if (Ryanpeikou.checker(groups)) return false;
    const sequences = groups.filter(g => g.type === GroupType.SEQUENCE)
    const codes = sequences.map(s => s.tiles[0].tile.code);
    const uniqueCodes = new Set(codes);
    return uniqueCodes.size === sequences.length - 1;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Iipeikou", () => {
    const input = "123p 123p 456m 777s 11z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Iipeikou.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Iipeikou", () => {
    const input = "123p 123p 456m 777>s 11z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Iipeikou.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
