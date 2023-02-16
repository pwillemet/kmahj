export const Riichi = {
    name: "Riichi",
    checker: (_, roundProps) => roundProps?.riichi ?? false
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Riichi", () => {
        const result = Riichi.checker(null, { riichi: true });
        expect(result).toBeTruthy();
    });
    test("Not Riichi", () => {
        const result = Riichi.checker(null, { riichi: false });
        expect(result).toBeFalsy();
    });
}
