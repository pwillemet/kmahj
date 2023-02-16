import { GroupType, MahjongGroupState } from '../../../core';
import { MpszParser } from '../../../parser';
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils';
export const Ryanpeikou = {
    name: "Ryanpeikou",
    checker: groups => {
        const closedSeq = groups
            .filter(g => g.type === GroupType.SEQUENCE)
            .filter(g => g.state === MahjongGroupState.HIDDEN);
        if (closedSeq.length !== 4)
            return false;
        const firstTileCodes = closedSeq.map(seq => seq.tiles[0].tile.code).sort();
        return firstTileCodes[0] === firstTileCodes[1] && firstTileCodes[2] === firstTileCodes[3];
    }
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Ryanpeikou", () => {
        const input = "123p 123p 678s 678s 77z";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = Ryanpeikou.checker(groups);
        expect(result).toBeTruthy();
    });
    test("Not Ryanpeikou", () => {
        const input = "123p 123s 678p 678s 11m";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = Ryanpeikou.checker(groups);
        expect(result).toBeFalsy();
    });
}
