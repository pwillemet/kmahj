import { getTileRef, MahjongTile, MahjongTileModificator, TileCode, TileRef } from '../../core'
import { ParsedGroup, ParsedHand, Parser } from '../Parser.model'
import { ParseError } from '../error'
import { UnicodeModificator } from './unicode.model'

const GROUP_SEPARATOR = " ";
const WINNING_TILE_SEPARATOR = "+";
const UNICODE_TILES_DICTIONNARY = new Map<string, TileRef>([
  ["🀙", getTileRef(TileCode.PIN_1)],
  ["🀚", getTileRef(TileCode.PIN_2)],
  ["🀛", getTileRef(TileCode.PIN_3)],
  ["🀜", getTileRef(TileCode.PIN_4)],
  ["🀝", getTileRef(TileCode.PIN_5)],
  ["🀞", getTileRef(TileCode.PIN_6)],
  ["🀟", getTileRef(TileCode.PIN_7)],
  ["🀠", getTileRef(TileCode.PIN_8)],
  ["🀡", getTileRef(TileCode.PIN_9)],
  ["🀇", getTileRef(TileCode.MAN_1)],
  ["🀈", getTileRef(TileCode.MAN_2)],
  ["🀉", getTileRef(TileCode.MAN_3)],
  ["🀊", getTileRef(TileCode.MAN_4)],
  ["🀋", getTileRef(TileCode.MAN_5)],
  ["🀌", getTileRef(TileCode.MAN_6)],
  ["🀍", getTileRef(TileCode.MAN_7)],
  ["🀎", getTileRef(TileCode.MAN_8)],
  ["🀏", getTileRef(TileCode.MAN_9)],
  ["🀐", getTileRef(TileCode.SEN_1)],
  ["🀑", getTileRef(TileCode.SEN_2)],
  ["🀒", getTileRef(TileCode.SEN_3)],
  ["🀓", getTileRef(TileCode.SEN_4)],
  ["🀔", getTileRef(TileCode.SEN_5)],
  ["🀕", getTileRef(TileCode.SEN_6)],
  ["🀖", getTileRef(TileCode.SEN_7)],
  ["🀗", getTileRef(TileCode.SEN_8)],
  ["🀘", getTileRef(TileCode.SEN_9)],
  ["🀀", getTileRef(TileCode.EAST)],
  ["🀁", getTileRef(TileCode.SOUTH)],
  ["🀂", getTileRef(TileCode.WEST)],
  ["🀃", getTileRef(TileCode.NORTH)],
  ["🀆", getTileRef(TileCode.WHITE)],
  ["🀅", getTileRef(TileCode.GREEN)],
  ["🀄", getTileRef(TileCode.RED)],
  ["🀢", getTileRef(TileCode.PLUM)],
  ["🀣", getTileRef(TileCode.ORCHID)],
  ["🀤", getTileRef(TileCode.BAMBOO)],
  ["🀥", getTileRef(TileCode.CHRYSANTHEMUM)],
  ["🀦", getTileRef(TileCode.SPRING)],
  ["🀧", getTileRef(TileCode.SUMMER)],
  ["🀨", getTileRef(TileCode.AUTUMN)],
  ["🀩", getTileRef(TileCode.WINTER)],
  ["🀪", getTileRef(TileCode.JOKER)],
]);
const UNICODE_MODIFICATORS_DICTIONNARY = new Map<UnicodeModificator, MahjongTileModificator>([
  ["^", MahjongTileModificator.SUPERPOSED],
  [">", MahjongTileModificator.INCLINED],
  ["<", MahjongTileModificator.INCLINED],
  ["v", MahjongTileModificator.REVERTED],
  ["*", MahjongTileModificator.AKA],
])

const UNICODE_REGEX = /^(?:\s*(?:(?:[🀀🀁🀂🀃🀄🀅🀆🀇🀈🀉🀊🀋🀌🀍🀎🀏🀐🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀢🀣🀤🀥🀦🀧🀨🀩🀪][\^<>v]?|[🀋🀔🀝]\*?[\^<>v]?\*?)*)+)+(?:\s*\+\s*(?:[🀀🀁🀂🀃🀄🀅🀆🀇🀈🀉🀊🀋🀌🀍🀎🀏🀐🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀪]|[🀋🀔🀝]\*?))?\s*$/u

export const UnicodeParser: Parser = {
  canParse(input: string): boolean {
    return UNICODE_REGEX.test(input);
  },
  parse(input: string): ParsedHand {
    if (!UNICODE_REGEX.test(input)) throw new ParseError();
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
            tile: UNICODE_TILES_DICTIONNARY.get(char)!,
            modificators: winningFlag ? [MahjongTileModificator.WINNING] : [],
          }
        groups.at(-1)!.tiles.push(tile);
      }
      if (isModificator(char)) {
        const lastTile = groups.at(-1)!.tiles.at(-1);
        if (lastTile == null) throw new ParseError();
        lastTile.modificators.push(UNICODE_MODIFICATORS_DICTIONNARY.get(char)!);
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


function prepareInput(input: string): string[] {
  const str = input
    .replaceAll(/\s+/g, GROUP_SEPARATOR)
    .replace(/\s?\+\s?/, WINNING_TILE_SEPARATOR)
    .trim();
  return [...str];
}

function isTile(input: string): boolean {
  return /[🀀🀁🀂🀃🀄🀅🀆🀇🀈🀉🀊🀋🀌🀍🀎🀐🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀢🀣🀤🀥🀦🀧🀨🀩🀪]/.test(input);
}

function isModificator(input: string): input is UnicodeModificator {
  return [...UNICODE_MODIFICATORS_DICTIONNARY.keys()].includes(input as UnicodeModificator);
}

function isSpace(input: string): input is typeof GROUP_SEPARATOR {
  return input === GROUP_SEPARATOR;
}
function isWinningTileSeparator(input: string): input is typeof WINNING_TILE_SEPARATOR {
  return input === WINNING_TILE_SEPARATOR;
}
