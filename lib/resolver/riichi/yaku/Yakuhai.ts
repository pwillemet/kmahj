import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType, TileCode } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'
import { RoundProps } from '../riichi.model'

export const Red: ClassicYaku = {
  name: "Yakuhai Red",
  checker: groups => groups
    .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
    .some(g => g.tiles[0].tile.code === TileCode.RED)
}

export const Green: ClassicYaku = {
  name: "Yakuhai Green",
  checker: groups => groups
    .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
    .some(g => g.tiles[0].tile.code === TileCode.GREEN)
}

export const White: ClassicYaku = {
  name: "Yakuhai White",
  checker: groups => groups
    .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
    .some(g => g.tiles[0].tile.code === TileCode.WHITE)
}

export const PlayerWind: ClassicYaku = {
  name: "Yakuhai Player Wind",
  checker: (groups, roundProps) => groups
    .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
    .some(g => g.tiles[0].tile.code === roundProps?.playerWind)
}

export const RoundWind: ClassicYaku = {
  name: "Yakuhai Round Wind",
  checker: (groups, roundProps) => groups
    .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
    .some(g => g.tiles[0].tile.code === roundProps?.roundWind)
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Red", () => {
    const input = "222z 333z 444z 777z 11m"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Red.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Green", () => {
    const input = "222z 333z 444z 666z 11m"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Green.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("White", () => {
    const input = "222z 333z 444z 555z 11m"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = White.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Player Wind", () => {
    const input = "222z 333m 444s 666z 11m"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Green.checker(groups as ClassicHandPattern, { playerWind: 2 } as RoundProps);
    expect(result).toBeTruthy();
  })

  test("Round Wind", () => {
    const input = "222z 333m 444s 666z 11m"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Green.checker(groups as ClassicHandPattern, { roundWind: 2 } as RoundProps);
    expect(result).toBeTruthy();
  })
}

