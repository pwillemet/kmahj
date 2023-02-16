import { MahjongGroupState } from '../../../core';
import { WINNING_KIND } from '../riichi.model';
export const MenzenTsumo = {
    name: "Menzen Tsumo",
    checker: (groups, roundProps) => groups.every(g => g.state === MahjongGroupState.HIDDEN) && roundProps?.winningKind === WINNING_KIND.TSUMO,
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Menzen Tsummo", () => {
        const result = MenzenTsumo.checker([{ state: MahjongGroupState.HIDDEN }], { winningKind: WINNING_KIND.TSUMO });
        expect(result).toBeTruthy();
    });
    test("Not Menzen Tsumo", () => {
        const result = MenzenTsumo.checker([{ state: MahjongGroupState.OPEN }], { winningKind: WINNING_KIND.RON });
        expect(result).toBeFalsy();
    });
}
