import { MahjongGroup, MahjongTile } from '../../../core';
import { RoundProps } from '../riichi.model';
export type Yaku = {
    name: string;
};
export type FullHandChecker = (tiles: MahjongTile[]) => boolean;
export type FullHandYaku = Yaku & {
    checker: FullHandChecker;
};
export type ClassicHandPattern = [MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup];
export type GroupsChecker = (groups: ClassicHandPattern, roundProps?: RoundProps) => boolean;
export type ClassicYaku = Yaku & {
    checker: GroupsChecker;
};
export type ChiiToitsuHandPattern = [MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup];
export type ChiiToitsuChecker = (groups: ChiiToitsuHandPattern, roundProps?: RoundProps) => boolean;
export type ChiiToitsuYaku = Yaku & {
    checker: ChiiToitsuChecker;
};
export type MixedChecker = (groups: ClassicHandPattern | ChiiToitsuHandPattern, roundProps?: RoundProps) => boolean;
export type MixedYaku = Yaku & {
    checker: MixedChecker;
};
export type DiscardChecker = (tiles: MahjongTile[], roundProps: RoundProps) => boolean;
export type DiscardYaku = Yaku & {
    checker: DiscardChecker;
};
export type HanNumberYaku = Yaku & {
    checker: (han: number) => boolean;
};
export declare function isClassicHandPattern(groups: MahjongGroup[]): groups is ClassicHandPattern;
export declare function isChiiToitsuHandPattern(groups: MahjongGroup[]): groups is ChiiToitsuHandPattern;
