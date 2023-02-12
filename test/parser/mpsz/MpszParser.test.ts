import { describe, expect, test } from 'vitest'
import { MahjongTileModificator, MpszParser } from '../../../lib'

describe("MpszParser", () => {
  test("basic input", () => {
    const input = "123456789m12344p";
    const p = MpszParser(input);
    expect(p.groups.length === 1)
    const tiles = p.groups[0].tiles;
    const modificators = tiles.map(t => t.modificators).flat();
    expect(modificators.length).toBe(0);
    const codes = tiles.map(t => t.tile.code);
    expect(codes).toEqual(
      [21, 22, 23, 24, 25, 26, 27, 28, 29, 1, 2, 3, 4, 4]
    );
  })
  test("modificators", () => {
    const input = "456p 1>23p 345*>p 6v666vp 0>55m 6>6^66s";
    const p = MpszParser(input);
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
