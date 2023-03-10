import { Parser } from '../Parser.model'
import { MpszFamily, MpszModificator, MpszParsedTile } from './mpsz.model'
import { getTileRef, MahjongTile, MahjongTileModificator, TileCode, TileNumberStr, TileRef } from '../../core'
import { AKA_CHAR, GROUP_SEPARATOR, MPSZ_REGEX, WINNING_TILE_SEPARATOR } from './const'
import { ParseError } from '../error'
import { ParsedGroup } from '../Parser.model'

const MPSZ_MODIFICATORS = Object.values(MpszModificator);
const MPSZ_FAMILIES = Object.values(MpszFamily);
const MPSZ_TILES_DICTIONNARY = new Map<string, TileRef>([
  ["1p", getTileRef(TileCode.PIN_1)],
  ["2p", getTileRef(TileCode.PIN_2)],
  ["3p", getTileRef(TileCode.PIN_3)],
  ["4p", getTileRef(TileCode.PIN_4)],
  ["5p", getTileRef(TileCode.PIN_5)],
  ["6p", getTileRef(TileCode.PIN_6)],
  ["7p", getTileRef(TileCode.PIN_7)],
  ["8p", getTileRef(TileCode.PIN_8)],
  ["9p", getTileRef(TileCode.PIN_9)],
  ["1m", getTileRef(TileCode.MAN_1)],
  ["2m", getTileRef(TileCode.MAN_2)],
  ["3m", getTileRef(TileCode.MAN_3)],
  ["4m", getTileRef(TileCode.MAN_4)],
  ["5m", getTileRef(TileCode.MAN_5)],
  ["6m", getTileRef(TileCode.MAN_6)],
  ["7m", getTileRef(TileCode.MAN_7)],
  ["8m", getTileRef(TileCode.MAN_8)],
  ["9m", getTileRef(TileCode.MAN_9)],
  ["1s", getTileRef(TileCode.SEN_1)],
  ["2s", getTileRef(TileCode.SEN_2)],
  ["3s", getTileRef(TileCode.SEN_3)],
  ["4s", getTileRef(TileCode.SEN_4)],
  ["5s", getTileRef(TileCode.SEN_5)],
  ["6s", getTileRef(TileCode.SEN_6)],
  ["7s", getTileRef(TileCode.SEN_7)],
  ["8s", getTileRef(TileCode.SEN_8)],
  ["9s", getTileRef(TileCode.SEN_9)],
  ["1z", getTileRef(TileCode.EAST)],
  ["2z", getTileRef(TileCode.SOUTH)],
  ["3z", getTileRef(TileCode.WEST)],
  ["4z", getTileRef(TileCode.NORTH)],
  ["5z", getTileRef(TileCode.WHITE)],
  ["6z", getTileRef(TileCode.GREEN)],
  ["7z", getTileRef(TileCode.RED)],
  ]
);
const MPDZ_MODIFICATORS_DICTIONNARY: Record<MpszModificator, MahjongTileModificator> = {
  '*': MahjongTileModificator.AKA,
  '^': MahjongTileModificator.SUPERPOSED,
  '>': MahjongTileModificator.INCLINED,
  '<': MahjongTileModificator.INCLINED,
  v: MahjongTileModificator.REVERTED
}

export const MpszParser: Parser = {
  canParse(input: string) {
    return MPSZ_REGEX.test(input);
  },
  parse(input: string) {
    if (!MPSZ_REGEX.test(input)) throw new ParseError();
    const prepared = prepareInput(input);
    let k = 0;
    const groups: ParsedGroup[] = [
      { tiles: [] }
    ];
    let partialTiles: MpszParsedTile[] = [];
    let winningFlag = false;
    while (k < prepared.length) {
      const char = prepared[k]
      if (isNumber(char)) {
        const tile = char === AKA_CHAR
          ? {
            number: TileNumberStr.FIVE,
            modificators: [MpszModificator.AKA],
            winning: winningFlag
          }
          : {
            number: char,
            modificators: [],
            winning: winningFlag,
          }
        partialTiles.push(tile);
      }
      if (isModificator(char)) {
        const lastTile = partialTiles.at(-1);
        if (lastTile == null) throw new ParseError();
        lastTile.modificators.push(char);
      }
      if (isFamily(char)) {
        if (partialTiles.length === 0) throw new ParseError();
        const parsedTiles: MpszParsedTile[] = partialTiles.map(pt => ({ ...pt, family: char }));
        const mahjongTiles = parsedTiles.map(pt => parsedTileToMahjongTile(pt, char));
        groups.at(winningFlag ? 0 : -1)!.tiles.push(...mahjongTiles);
        partialTiles = [];
      }
      if (isSpace(char)) {
        if (partialTiles.length > 0) throw new ParseError();
        groups.push({ tiles: [] });
      }
      if (isWinningTileSeparator(char)) {
        winningFlag = true;
      }
      k++;
    }
    return { groups };
  }
}

function prepareInput(input: string): string {
  return input
    .replaceAll(/\s+/g, GROUP_SEPARATOR)
    .replace(/\s?\+\s?/, WINNING_TILE_SEPARATOR)
    .trim();
}

function isNumber(input: string): input is TileNumberStr | typeof AKA_CHAR {
  return !isNaN(Number.parseInt(input));
}

function isModificator(input: string): input is MpszModificator {
  return MPSZ_MODIFICATORS.includes(input as MpszModificator);
}

function isFamily(input: string): input is MpszFamily {
  return MPSZ_FAMILIES.includes(input as MpszFamily);
}

function isSpace(input: string): input is typeof GROUP_SEPARATOR {
  return input === GROUP_SEPARATOR;
}
function isWinningTileSeparator(input: string): input is typeof WINNING_TILE_SEPARATOR {
  return input === WINNING_TILE_SEPARATOR;
}

function parsedTileToMahjongTile(parsedTile: MpszParsedTile, family: MpszFamily): MahjongTile {
  const tile = MPSZ_TILES_DICTIONNARY.get(`${parsedTile.number}${family}`);
  if (tile == null) throw new ParseError("Unknown tile");
  const modificators = parsedTile.modificators.map((m: MpszModificator) => MPDZ_MODIFICATORS_DICTIONNARY[m]);
  if (parsedTile.winning) modificators.push(MahjongTileModificator.WINNING);
  return { tile, modificators };
}
