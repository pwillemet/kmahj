import { isWinningTile } from '../../../core';
import { MpszParser } from '../../../parser';
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils';
export const Tenhou = {
    name: "Tenhou",
    checker: (groups, roundProps) => {
        if (!roundProps?.firstTurn)
            return false;
        const hasWinningTile = groups.map(g => g.tiles).flat().some(t => isWinningTile(t));
        return !hasWinningTile;
    }
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    const input = "234s 333s 666s 888s 66m";
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    test("Tenhou", () => {
        const result = Tenhou.checker(groups, { firstTurn: true });
        expect(result).toBeTruthy();
    });
    test("Not Tenhou", () => {
        const result = Tenhou.checker(groups, { firstTurn: false });
        expect(result).toBeFalsy();
    });
}
