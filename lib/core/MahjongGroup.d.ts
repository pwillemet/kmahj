import { MahjongTile } from './MahjongTile';
import { GroupType } from './GroupType';
export type MahjongGroupState = "hidden" | "open";
export declare const MahjongGroupState: {
    HIDDEN: MahjongGroupState;
    OPEN: MahjongGroupState;
};
export type MahjongGroup = {
    tiles: MahjongTile[];
    state: MahjongGroupState;
    type: GroupType;
    isolated: boolean;
};
