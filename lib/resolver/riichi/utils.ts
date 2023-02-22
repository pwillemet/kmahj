import { TILE, TileCode, TileRef } from '../../core'

const DRAGONS_ORDER = [
  TileCode.WHITE,
  TileCode.GREEN,
  TileCode.RED,
];

const WINDS_ORDER = [
  TileCode.EAST,
  TileCode.SOUTH,
  TileCode.WEST,
  TileCode.NORTH,
]

export function nextTile(tile: TileRef): TileRef | null {
  const code = tile.code;
  let codeIndex;
  let nextTileCode;
  if ((codeIndex = DRAGONS_ORDER.indexOf(code)) >= 0) {
    const nextIndex = (codeIndex + 1) % DRAGONS_ORDER.length
    nextTileCode = DRAGONS_ORDER[nextIndex];
  } else if ((codeIndex = WINDS_ORDER.indexOf(code)) >= 0) {
    const nextIndex = (codeIndex + 1) % WINDS_ORDER.length
    nextTileCode = WINDS_ORDER[nextIndex];
  } else if (codeIndex < 30) {
    const tens = Math.floor(codeIndex / 10);
    const unit = (codeIndex + 1) % 10;
    nextTileCode = tens * 10 + unit;
  } else return null;
  return TILE[nextTileCode as TileCode];
}
