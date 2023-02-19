import { describe, expect, test } from 'vitest'
import { JapaneseParser } from '../../../lib/parser/japanese/JapaneseParser'
import { MahjongTileModificator } from '../../../lib'

describe("JapaneseParser", () => {
  test("basic input", () => {
    const input = "➀➀➀➃➄➅六七八西西西RR";
    const p = JapaneseParser.parse(input);
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
    const input = "➃➄➅ ➀>➁➂ ➂➃➄*> ➅v➅➅➅v 五*>五五 6>6^66";
    const p = JapaneseParser.parse(input);
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
