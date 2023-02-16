import { WINNING_KIND } from '../riichi.model';
export const Chankan = {
    name: "Chankan",
    checker: (_, roundProps) => {
        return roundProps?.winningKind === WINNING_KIND.CHANKAN;
    }
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Chankan", () => {
        const result = Chankan.checker(null, { winningKind: WINNING_KIND.CHANKAN });
        expect(result).toBeTruthy();
    });
    test("Not Chankan", () => {
        const result = Chankan.checker(null, null);
        expect(result).toBeFalsy();
    });
}
