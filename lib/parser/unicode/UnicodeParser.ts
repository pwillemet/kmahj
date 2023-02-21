import { getTileRef, MahjongTile, MahjongTileModificator, QUAD_SIZE, TileCode, TileRef } from '../../core'
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

const UNICODE_REGEX = /^(?:\s*(?:(?:[🀙-🀪][\^<>v]?|[🀋🀔🀝]\*?[\^<>v]?\*?)*)+)+(?:\s*\+\s*(?:[🀙-🀅🀪]|[🀋🀔🀝]\*?))?\s*$/i

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
      if (isNumber(char)) {
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
    checkGroups(groups);
    return { groups };
  }
}


function prepareInput(input: string): string {
  return input
    .replaceAll(/\s+/g, GROUP_SEPARATOR)
    .replace(/\s?\+\s?/, WINNING_TILE_SEPARATOR)
    .trim();
}

function isNumber(input: string): boolean {
  return /[🀙-🀪]/.test(input);
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

function checkGroups(groups: ParsedGroup[]): void {
  groups.forEach((group, i) => checkMpszGroup(group, i));
}

function checkMpszGroup(mpszGroup: ParsedGroup, index: number): void {
  if (index === 0) {
    // First group cannot contains modificators beside AKA
    const modificatorsInFirstGroup: MahjongTileModificator[][] = mpszGroup.tiles.map(tile => tile.modificators);
    const containsInvalidModificator = modificatorsInFirstGroup.flat().some(m => m !== MahjongTileModificator.AKA && m !== MahjongTileModificator.WINNING)
    if (containsInvalidModificator) throw new ParseError("Invalid modificators in first group");
  } else {
    // Other groups cannot have more than 4 tiles
    if (mpszGroup.tiles.length > QUAD_SIZE) throw new ParseError("Invalid group size");
    const modificators: MahjongTileModificator[][] = mpszGroup.tiles.map(tile => tile.modificators)
    const allModificators = modificators.flat();
    // Superposed tile can only be in a Quad and must be unique
    const invalidSuperposed =
      mpszGroup.tiles.length !== QUAD_SIZE && allModificators.includes(MahjongTileModificator.SUPERPOSED) ||
      allModificators.filter(m => m === MahjongTileModificator.SUPERPOSED).length > 1;
    if (invalidSuperposed) throw new ParseError("Invalid Superposed modificator");
    // Inclined tile must be unique
    const invalidInclined = allModificators.filter(m => m === MahjongTileModificator.INCLINED).length > 1;
    if (invalidInclined) throw new ParseError("Invalid Inclined modificator");
    // Reverted tile must be in a Quad with no inclined tile
    const invalidReverted =
      mpszGroup.tiles.length !== 4 && allModificators.includes(MahjongTileModificator.REVERTED)
      || allModificators.includes(MahjongTileModificator.REVERTED) && allModificators.includes(MahjongTileModificator.INCLINED);
    if (invalidReverted) throw new ParseError("Invalid Reverted modificator");
  }
}
