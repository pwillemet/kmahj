import { WINNING_KIND } from '../riichi.model';
export const Rinshan = {
    name: "Rinshan Kaihou",
    checker: (_, roundProps) => {
        return roundProps?.winningKind === WINNING_KIND.RINSHAN;
    }
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Rinshan", () => {
        const result = Rinshan.checker(null, { winningKind: WINNING_KIND.RINSHAN });
        expect(result).toBeTruthy();
    });
    test("Not Rinshan", () => {
        const result = Rinshan.checker(null, { winningKind: WINNING_KIND.RON });
        expect(result).toBeFalsy();
    });
}
