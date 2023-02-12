import { TileRef } from './TileRef'

export type MahjongTileModificator = "aka" | "reverted" | "inclined" | "superposed" | "winning";
export const MahjongTileModificator = {
  AKA: "aka" as MahjongTileModificator,
  INCLINED: "inclined" as MahjongTileModificator,
  REVERTED: "reverted" as MahjongTileModificator,
  SUPERPOSED: "superposed" as MahjongTileModificator,
  WINNING: "winning" as MahjongTileModificator,
}

export type MahjongTile = {
  tile: TileRef,
  modificators: MahjongTileModificator[],
}
