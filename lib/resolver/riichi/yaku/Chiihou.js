import { WINNING_KIND } from '../riichi.model';
export const Chiihou = {
    name: "Chiihou",
    checker: (_, roundProps) => (roundProps?.firstTurn && roundProps?.winningKind === WINNING_KIND.TSUMO) ?? false
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Chiihou", () => {
        const result = Chiihou.checker(null, { winningKind: WINNING_KIND.TSUMO, firstTurn: true });
        expect(result).toBeTruthy();
    });
    test("Not Chiihou", () => {
        const result = Chiihou.checker(null, { winningKind: WINNING_KIND.TSUMO });
        expect(result).toBeFalsy();
    });
}
