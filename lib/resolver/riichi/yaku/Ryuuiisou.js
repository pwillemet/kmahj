import { TileCode } from '../../../core';
import { MpszParser } from '../../../parser';
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils';
const RYUUIISOU_TILES = [
    TileCode.SEN_2,
    TileCode.SEN_3,
    TileCode.SEN_4,
    TileCode.SEN_6,
    TileCode.SEN_8,
    TileCode.GREEN
];
export const Ryuuiisou = {
    name: "Ryuuiisou",
    checker: groups => {
        return groups
            .map(g => g.tiles)
            .flat()
            .map(t => t.tile.code)
            .every(c => RYUUIISOU_TILES.includes(c));
    }
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Ryuuiisou", () => {
        const input = "234s 234s 666s 888s 66z";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = Ryuuiisou.checker(groups);
        expect(result).toBeTruthy();
    });
    test("Not Ryuuiisou", () => {
        const input = "234s 234s 666s 999s 66z";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = Ryuuiisou.checker(groups);
        expect(result).toBeFalsy();
    });
}
