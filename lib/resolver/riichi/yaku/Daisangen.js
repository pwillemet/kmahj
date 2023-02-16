import { Green, Red, White } from './Yakuhai';
import { MpszParser } from '../../../parser';
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils';
export const Daisangen = {
    name: "Daisangen",
    checker: groups => {
        const red = Red.checker(groups);
        const green = Green.checker(groups);
        const white = White.checker(groups);
        return red && green && white;
    }
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test("Daisangen", () => {
        const input = "111p 22p 555z 666z 777z";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = Daisangen.checker(groups);
        expect(result).toBeTruthy();
    });
    test("Not Daisangen", () => {
        const input = "111p 222p 555z 666z 77z";
        const parsed = MpszParser(input);
        const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
        const result = Daisangen.checker(groups);
        expect(result).toBeFalsy();
    });
}
