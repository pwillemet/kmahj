import { WINNING_KIND } from '../riichi.model';
export const Renhou = {
    name: "Renhou",
    checker: (_, roundProps) => {
        return (roundProps?.firstTurn && roundProps?.winningKind === WINNING_KIND.RON) ?? false;
    }
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Renhou", () => {
        const result = Renhou.checker(null, { winningKind: WINNING_KIND.RON, firstTurn: true });
        expect(result).toBeTruthy();
    });
    test("Not Renhou", () => {
        const result = Renhou.checker(null, { winningKind: WINNING_KIND.TSUMO, firstTurn: false });
        expect(result).toBeFalsy();
    });
}
