import { WINNING_KIND } from '../riichi.model';
export const Houtei = {
    name: "Houtei",
    checker: (_, roundProps) => {
        return roundProps?.winningKind === WINNING_KIND.RON && roundProps?.lastTile;
    }
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Houtei", () => {
        const result = Houtei.checker(null, { winningKind: WINNING_KIND.RON, lastTile: true });
        expect(result).toBeTruthy();
    });
    test("Not Houtei", () => {
        const result = Houtei.checker(null, { winningKind: WINNING_KIND.TSUMO, lastTile: true });
        expect(result).toBeFalsy();
    });
}
