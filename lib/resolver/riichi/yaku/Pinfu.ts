import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType, isWinningTile, MahjongGroupState, TILE_FAMILY } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Pinfu: ClassicYaku = {
  name: "Pinfu",
  checker: (groups, roundProps) => {
    // Closed groups
    if (groups.some(g => g.state === MahjongGroupState.OPEN)) return false;
    // 4 sequences + on double
    const sequences = groups.filter(g => g.type === GroupType.SEQUENCE);
    if (sequences.length !== 4) return false;
    const double = groups.find(g => g.type === GroupType.DOUBLE)!;
    // No Fu with doubles
    const doubleTile = double.tiles[0].tile;
    if (doubleTile.family === TILE_FAMILY.dragon) return false;
    const doubleTileCode = doubleTile.code;
    if (doubleTileCode === roundProps?.playerWind || doubleTileCode === roundProps?.roundWind) return false;
    // No Fu with winning tile
    if (double.tiles.some(t => isWinningTile(t) )) return false; // tanki
    let winningTileIndex: number;
    const winningSequence = sequences.find(s => s.tiles.some((t, i) => {
      if (isWinningTile(t)) {
        winningTileIndex = i;
        return true;
      }
      return false;
    }))!;
    if (winningSequence == null) return false;
    if (winningTileIndex! === 1) return false; // kanchan
    const winningTileNumber = winningSequence.tiles[winningTileIndex!].tile.code % 10;
    if (winningTileIndex! === 0 && winningTileNumber === 7) return false; // penchan 789
    if (winningTileIndex! === 2 && winningTileNumber === 3) return false; // penchan 123
    return true;
  }
}


if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Pinfu", () => {
    const input = "23p 789s 789s 789m 11m+1p"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Pinfu.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Pinfu", () => {
    const input = "12p 789s 789s 789m 11m+3p"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Pinfu.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
