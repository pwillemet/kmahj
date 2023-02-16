import { WINNING_KIND } from '../riichi.model';
export const Haitei = {
    name: "Haitei",
    checker: (_, roundProps) => {
        return (roundProps?.winningKind === WINNING_KIND.TSUMO || roundProps?.winningKind === WINNING_KIND.RINSHAN) && roundProps?.lastTile;
    }
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Haitei", () => {
        const result = Haitei.checker(null, { winningKind: WINNING_KIND.TSUMO, lastTile: true });
        expect(result).toBeTruthy();
    });
    test("Not Haitei", () => {
        const result = Haitei.checker(null, { winningKind: WINNING_KIND.RON, lastTile: true });
        expect(result).toBeFalsy();
    });
}
