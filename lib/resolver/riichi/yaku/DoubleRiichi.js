export const DoubleRiichi = {
    name: "Double Riichi",
    checker: (_, roundProps) => roundProps?.doubleRiichi ?? false,
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Double Riichi", () => {
        const result = DoubleRiichi.checker(null, { doubleRiichi: true });
        expect(result).toBeTruthy();
    });
    test("Not Double Riichi", () => {
        const result = DoubleRiichi.checker(null, null);
        expect(result).toBeFalsy();
    });
}
