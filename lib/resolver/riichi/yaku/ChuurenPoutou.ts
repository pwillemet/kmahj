import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { Chinitsu } from './Chinitsu'
import { MahjongGroupState } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

const CHUUREN_PATTERNS = [
  "11112345678999",
  "11122345678999",
  "11123345678999",
  "11123445678999",
  "11123455678999",
  "11123456678999",
  "11123456778999",
  "11123456788999",
  "11123456789999",
]

export const ChuurenPoutou: ClassicYaku = {
  name: "Chuuren Poutou",
  checker: groups => {
    if (groups.some(g => g.state === MahjongGroupState.OPEN)) return false;
    if (!Chinitsu.checker(groups)) return false;
    const codes = groups
      .map(g => g.tiles)
      .flat()
      .map(t => t.tile.code % 10)
      .join("");
    return CHUUREN_PATTERNS.includes(codes);
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Chuuren Poutou", () => {
    const input = "111p 22p 345p 678p 999p"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = ChuurenPoutou.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Chuuren Poutou", () => {
    const input = "111p 222p 345p 678p 99p"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = ChuurenPoutou.checker(groups as ClassicHandPattern);expect(result).toBeFalsy();
  })
}
