import { getTileRef, MahjongTile, MahjongTileModificator, TileCode, TileRef } from '../../core'
import { ParsedGroup, ParsedHand, Parser } from '../Parser.model'
import { ParseError } from '../error'
import { JapaneseModificator } from './japanese.model'

const GROUP_SEPARATOR = " ";
const WINNING_TILE_SEPARATOR = "+";
const JAPANESE_TILES_DICTIONNARY = new Map<string, TileRef>([
  ["➀", getTileRef(TileCode.PIN_1)],
  ["➁", getTileRef(TileCode.PIN_2)],
  ["➂", getTileRef(TileCode.PIN_3)],
  ["➃", getTileRef(TileCode.PIN_4)],
  ["➄", getTileRef(TileCode.PIN_5)],
  ["➅", getTileRef(TileCode.PIN_6)],
  ["➆", getTileRef(TileCode.PIN_7)],
  ["➇", getTileRef(TileCode.PIN_8)],
  ["➈", getTileRef(TileCode.PIN_9)],
  ["一", getTileRef(TileCode.MAN_1)],
  ["二", getTileRef(TileCode.MAN_2)],
  ["三", getTileRef(TileCode.MAN_3)],
  ["四", getTileRef(TileCode.MAN_4)],
  ["五", getTileRef(TileCode.MAN_5)],
  ["六", getTileRef(TileCode.MAN_6)],
  ["七", getTileRef(TileCode.MAN_7)],
  ["八", getTileRef(TileCode.MAN_8)],
  ["九", getTileRef(TileCode.MAN_9)],
  ["1", getTileRef(TileCode.SEN_1)],
  ["2", getTileRef(TileCode.SEN_2)],
  ["3", getTileRef(TileCode.SEN_3)],
  ["4", getTileRef(TileCode.SEN_4)],
  ["5", getTileRef(TileCode.SEN_5)],
  ["6", getTileRef(TileCode.SEN_6)],
  ["7", getTileRef(TileCode.SEN_7)],
  ["8", getTileRef(TileCode.SEN_8)],
  ["9", getTileRef(TileCode.SEN_9)],
  ["T", getTileRef(TileCode.EAST)],
  ["N", getTileRef(TileCode.SOUTH)],
  ["西", getTileRef(TileCode.WEST)],
  ["北", getTileRef(TileCode.NORTH)],
  ["白", getTileRef(TileCode.WHITE)],
  ["R", getTileRef(TileCode.GREEN)],
  ["中", getTileRef(TileCode.RED)],
]);
const JAPANESE_MODIFICATORS_DICTIONNARY = new Map<JapaneseModificator, MahjongTileModificator>([
  ["^", MahjongTileModificator.SUPERPOSED],
  [">", MahjongTileModificator.INCLINED],
  ["<", MahjongTileModificator.INCLINED],
  ["v", MahjongTileModificator.REVERTED],
  ["*", MahjongTileModificator.AKA],
])

const JAPANESE_REGEX = /^(?:\s*(?:(?:[1-9➀-➈一二三四五六七八九N西北R中白][\^<>v]?|[5五➄]\*?[\^<>v]?\*?)*)+)+(?:\s*\+\s*(?:[1-9➀-➈一二三四五六七八九TN西北R中白]|[5五➄]\*?))?\s*$/i

export const JapaneseParser: Parser = {
  canParse(input: string): boolean {
    return JAPANESE_REGEX.test(input);
  },
  parse(input: string): ParsedHand {
    if (!JAPANESE_REGEX.test(input)) throw new ParseError();
    const prepared = prepareInput(input);
    let k = 0;
    const groups: ParsedGroup[] = [
      { tiles: [] }
    ];
    let winningFlag = false;
    while (k < prepared.length) {
      const char = prepared[k]
      if (isTile(char)) {
        const tile: MahjongTile = {
            tile: JAPANESE_TILES_DICTIONNARY.get(char)!,
            modificators: winningFlag ? [MahjongTileModificator.WINNING] : [],
          }
        groups.at(-1)!.tiles.push(tile);
      }
      if (isModificator(char)) {
        const lastTile = groups.at(-1)!.tiles.at(-1);
        if (lastTile == null) throw new ParseError();
        lastTile.modificators.push(JAPANESE_MODIFICATORS_DICTIONNARY.get(char)!);
      }
      if (isSpace(char)) {
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

function isTile(input: string): boolean {
  return /[1-9➀-➈一二三四五六七八九TN西北R中白]/.test(input);
}

function isModificator(input: string): input is JapaneseModificator {
  return [...JAPANESE_MODIFICATORS_DICTIONNARY.keys()].includes(input as JapaneseModificator);
}

function isSpace(input: string): input is typeof GROUP_SEPARATOR {
  return input === GROUP_SEPARATOR;
}
function isWinningTileSeparator(input: string): input is typeof WINNING_TILE_SEPARATOR {
  return input === WINNING_TILE_SEPARATOR;
}
