import { GroupType, MahjongGroup, MahjongTile } from '../../../core'
import { RoundProps } from '../riichi.model'

export type Yaku = {
  name: string;
}

export type FullHandChecker = (tiles: MahjongTile[]) => boolean;
export type FullHandYaku = Yaku & {
  checker: FullHandChecker
};

export type ClassicHandPattern = [MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup];
export type GroupsChecker = (groups: ClassicHandPattern, roundProps?: RoundProps) => boolean;
export type ClassicYaku = Yaku & {
  checker: GroupsChecker
};

export type ChiiToitsuHandPattern = [MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup, MahjongGroup];
export type ChiiToitsuChecker = (groups: ChiiToitsuHandPattern, roundProps?: RoundProps) => boolean;
export type ChiiToitsuYaku = Yaku & {
  checker: ChiiToitsuChecker
};

export type MixedChecker = (groups: ClassicHandPattern | ChiiToitsuHandPattern, roundProps?: RoundProps) => boolean;
export type MixedYaku = Yaku & {
  checker: MixedChecker
}

export type DiscardChecker = (tiles: MahjongTile[], roundProps: RoundProps) => boolean;
export type DiscardYaku = Yaku & {
  checker: DiscardChecker
}

export type HanNumberYaku = Yaku & {
  checker: (han: number) => boolean;
}

export function isClassicHandPattern(groups: MahjongGroup[]): groups is ClassicHandPattern {
  return groups.length === 5
    && groups.filter(g => g.type === GroupType.DOUBLE).length === 1
    && groups.every(g => g.type !== GroupType.SPECIAL);
}

export function isChiiToitsuHandPattern(groups: MahjongGroup[]): groups is ChiiToitsuHandPattern {
  return groups.length === 7
    && groups.every(g => g.type === GroupType.DOUBLE);
}
