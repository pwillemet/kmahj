export const Ippatsu = {
    name: "Ippatsu",
    checker: (_, roundProps) => {
        if (roundProps == null)
            return false;
        return roundProps.riichi && roundProps.firstTurnAfterRiichi;
    },
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Ippatsu", () => {
        const result = Ippatsu.checker(null, { riichi: true, firstTurnAfterRiichi: true });
        expect(result).toBeTruthy();
    });
    test("Not Ippatsu", () => {
        const result = Ippatsu.checker(null, { riichi: true, firstTurnAfterRiichi: false });
        expect(result).toBeFalsy();
    });
}
