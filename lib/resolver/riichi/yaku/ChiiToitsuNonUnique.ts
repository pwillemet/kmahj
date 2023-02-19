import { ChiiToitsuHandPattern, ChiiToitsuYaku, isChiiToitsuHandPattern } from './yaku.model'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const ChiiToitsuNonUnique: ChiiToitsuYaku = {
  name: "Chii toitsu",
  checker: (groups) => {
    return isChiiToitsuHandPattern(groups);
  }
}


if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Chii Toitsu non unique", () => {
    const input = "11p 22p 33p 44p 55p 66p 66p"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = ChiiToitsuNonUnique.checker(groups as ChiiToitsuHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Chii Toitsu non unique", () => {
    const input = "11p 22p 33p 44p 55p 66p"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = ChiiToitsuNonUnique.checker(groups as ChiiToitsuHandPattern);expect(result).toBeFalsy();
  })
}

