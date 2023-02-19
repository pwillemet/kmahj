import { ChiiToitsuHandPattern, ChiiToitsuYaku, isChiiToitsuHandPattern } from './yaku.model'
import { MINIMUM_FULL_HAND_SIZE } from '../const'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const ChiiToitsuUnique: ChiiToitsuYaku = {
  name: "Chii toitsu",
  checker: (groups) => {
    if (!isChiiToitsuHandPattern(groups)) return false;
    const tiles = groups.map(g => g.tiles).flat();
    const codes = new Set(tiles.map(t => t.tile.code));
    return codes.size === MINIMUM_FULL_HAND_SIZE / 2;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Chii Toitsu unique", () => {
    const input = "11p 22p 33p 44p 55p 66p 77p"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = ChiiToitsuUnique.checker(groups as ChiiToitsuHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Chii Toitsu non unique", () => {
    const input = "11p 22p 33p 44p 55p 66p 66p"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = ChiiToitsuUnique.checker(groups as ChiiToitsuHandPattern);expect(result).toBeFalsy();
  })
}

