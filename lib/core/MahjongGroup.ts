import { MahjongTile } from './MahjongTile'
import { GroupType } from './GroupType'

export type MahjongGroupState = "hidden" | "open";
export const MahjongGroupState = {
  HIDDEN: "hidden" as MahjongGroupState,
  OPEN: "open" as MahjongGroupState,
};

export type MahjongGroup = {
  tiles: MahjongTile[],
  state: MahjongGroupState,
  type: GroupType,
  isolated: boolean,
}
