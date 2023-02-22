import { describe, expect, test } from 'vitest';
import { UnicodeParser } from '../../../lib/parser/unicode/UnicodeParser';
import { MahjongTileModificator } from '../../../lib';

describe("UnicodeParser", () => {
  test("basic input", () => {
    const input = "🀙🀙🀙🀜🀝🀞🀌🀍🀎🀂🀂🀂🀅🀅";
    const p = UnicodeParser.parse(input);
    expect(p.groups.length === 1)
    const tiles = p.groups[0].tiles;
    const modificators = tiles.map(t => t.modificators).flat();
    expect(modificators.length).toBe(0);
    const codes = tiles.map(t => t.tile.code);
    expect(codes).toEqual(
      [1, 1, 1, 4, 5, 6, 26, 27, 28, 33, 33, 33, 36, 36]
    );
  })
  test("modificators", () => {
    const input = "🀜🀝🀞 🀙>🀚🀛 🀛🀜🀝*> 🀞v🀞🀞🀞v 🀋*>🀋🀋 🀕>🀕^🀕🀕";
    const p = UnicodeParser.parse(input);
    expect(p.groups.length === 1)
    const tiles = p.groups.map(g => g.tiles).flat();
    const modificators = tiles.map(t => t.modificators);
    expect(modificators[3]).toEqual([MahjongTileModificator.INCLINED]);
    expect(modificators[8]).toEqual([MahjongTileModificator.AKA, MahjongTileModificator.INCLINED]);
    expect(modificators[9]).toEqual([MahjongTileModificator.REVERTED]);
    expect(modificators[12]).toEqual([MahjongTileModificator.REVERTED]);
    expect(modificators[13]).toEqual([MahjongTileModificator.AKA, MahjongTileModificator.INCLINED]);
    expect(modificators[16]).toEqual([MahjongTileModificator.INCLINED]);
    expect(modificators[17]).toEqual([MahjongTileModificator.SUPERPOSED]);
  })
})
