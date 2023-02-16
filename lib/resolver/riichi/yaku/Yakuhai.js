import { GroupType, TileCode } from '../../../core';
import { MpszParser } from '../../../parser';
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils';
export const Red = {
    name: "Yakuhai Red",
    checker: groups => groups
        .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
        .some(g => g.tiles[0].tile.code === TileCode.RED)
};
export const Green = {
    name: "Yakuhai Green",
    checker: groups => groups
        .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
        .some(g => g.tiles[0].tile.code === TileCode.GREEN)
};
export const White = {
    name: "Yakuhai White",
    checker: groups => groups
        .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
        .some(g => g.tiles[0].tile.code === TileCode.WHITE)
};
export const PlayerWind = {
    name: "Yakuhai Player Wind",
    checker: (groups, roundProps) => groups
        .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
        .some(g => g.tiles[0].tile.code === roundProps?.playerWind)
};
export const RoundWind = {
    name: "Yakuhai Round Wind",
    checker: (groups, roundProps) => groups
        .filter(g => g.type === GroupType.TRIPLE || g.type === GroupType.QUAD)
        .some(g => g.tiles[0].tile.code === roundProps?.roundWind)
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Red", () => {
        const input = "222z 333z 444z 777z 11m";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = Red.checker(groups);
        expect(result).toBeTruthy();
    });
    test("Green", () => {
        const input = "222z 333z 444z 666z 11m";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = Green.checker(groups);
        expect(result).toBeTruthy();
    });
    test("White", () => {
        const input = "222z 333z 444z 555z 11m";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = White.checker(groups);
        expect(result).toBeTruthy();
    });
    test("Player Wind", () => {
        const input = "222z 333m 444s 666z 11m";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = Green.checker(groups, { playerWind: 2 });
        expect(result).toBeTruthy();
    });
    test("Round Wind", () => {
        const input = "222z 333m 444s 666z 11m";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = Green.checker(groups, { roundWind: 2 });
        expect(result).toBeTruthy();
    });
}
