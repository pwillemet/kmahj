import { MahjongTile, MahjongTileModificator } from './MahjongTile'
import { TILE_FAMILY_CATEGORY } from './TileFamilyCategoryRef'
import { TILE_FAMILY } from './TileFamilyRef'

export function isTerminal(tile: MahjongTile): boolean {
  if (tile.tile.family.category !== TILE_FAMILY_CATEGORY.suit) return false;
  const n = tile.tile.code % 10;
  return n === 1 || n === 9;
}

export function isOrdinary(tile: MahjongTile): boolean {
  if (tile.tile.family.category !== TILE_FAMILY_CATEGORY.suit) return false;
  const n = tile.tile.code % 10;
  return n !== 1 && n !== 9;
}

export function isHonor(tile: MahjongTile): boolean {
  return tile.tile.family.category === TILE_FAMILY_CATEGORY.honor;
}

export function isDragon(tile: MahjongTile): boolean {
  return tile.tile.family === TILE_FAMILY.dragon;
}

export function isWind(tile: MahjongTile): boolean {
  return tile.tile.family === TILE_FAMILY.wind;
}

export function isWinningTile(tile: MahjongTile): boolean {
  return tile.modificators.includes(MahjongTileModificator.WINNING);
}
