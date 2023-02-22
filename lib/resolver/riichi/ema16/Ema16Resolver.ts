import { Resolver, ResolverPossibility } from '../../Resolver.model'
import { simpleParsedGroupToMahjongGroup } from './utils'
import {
  ChiiToitsuHandPattern,
  ClassicHandPattern,
  isChiiToitsuHandPattern,
  isClassicHandPattern,
  KokushiMusou, Pinfu
} from '../yaku'
import { RiichiMahjongHand, RiichiMahjongHandWithoutScore, RoundProps, WINNING_KIND } from '../riichi.model'
import { GroupType, isOrdinary, MahjongGroup, MahjongGroupState, MahjongTile, MahjongTileModificator, TILE_FAMILY } from '../../../core'
import { ParsedHand } from '../../../parser'
import {
  EMA16_CLASSIC_YAKUMAN,
  EMA16_MIXED_YAKUMAN,
  EMA16_NORMAL_CHII_TOITSU_YAKU,
  EMA16_NORMAL_CLASSIC_YAKU,
  EMA16_NORMAL_MIXED_YAKU
} from './yaku'
import { RiichiScoreCalculator } from '../ScoreCalculator'
import { roundUp } from '../../../global/math'
import { nextTile } from '../utils'

export const Ema16Resolver: Resolver<RiichiMahjongHand, RoundProps> = (parsedHand, roundProps) => {
  if (parsedHand.groups.length === 0) return null;
  const mahjongHandWithoutScore = getMahjongHandWithoutScore(parsedHand, roundProps);
  if (mahjongHandWithoutScore == null) return null;
  const score = RiichiScoreCalculator(mahjongHandWithoutScore.yakuman, mahjongHandWithoutScore.han, mahjongHandWithoutScore.fu);
  return {
    ...mahjongHandWithoutScore,
    score
  };
}

function getMahjongHandWithoutScore(parsedHand: ParsedHand, roundProps?: RoundProps): RiichiMahjongHandWithoutScore | null {
  // check special hand Kokushi Musou
  const tiles = parsedHand.groups.map(g => g.tiles).flat();
  if (KokushiMusou.checker(tiles)) {
    const group: MahjongGroup = {
      tiles,
      type: GroupType.SPECIAL,
      state: MahjongGroupState.HIDDEN,
      isolated: false
    }
    return {
      groups: [group],
      han: 0,
      fu: 0,
      yakuman: 1,
      yaku: [KokushiMusou],
      dora: 0
    }
  }

  // Possibilities generation
  const groups = parsedHand.groups.slice();
  const firstGroup = groups.shift()!;
  firstGroup.tiles.sort((t1, t2) => t1.tile.code - t2.tile.code);
  const otherGroups = groups.map(g => simpleParsedGroupToMahjongGroup(g));
  const firstPossibility = new ResolverPossibility(firstGroup.tiles, otherGroups);
  firstPossibility.compute();
  const possibilities = firstPossibility.result()
    .filter(p => p.tiles.length === 0) // Keep possibilities that uses all tiles
  const classicHandPossibilities = possibilities.filter(p => isClassicHandPattern(p.groups));
  const chiiToitsuHandPossibilities = possibilities.filter(p => isChiiToitsuHandPattern(p.groups));

  // Check Yakuman
  for (let chiiToitsuHandPossibility of chiiToitsuHandPossibilities) {
    const yakuman = EMA16_MIXED_YAKUMAN.find(y => y.checker(chiiToitsuHandPossibility.groups as ChiiToitsuHandPattern, roundProps));
    if (yakuman != null) return {
      groups: chiiToitsuHandPossibility.groups,
      han: 0,
      fu: 0,
      yakuman: 1,
      yaku: [yakuman],
      dora: 0
    }
  }
  for (let classicHandPossibility of classicHandPossibilities) {
    const yakuman = [...EMA16_CLASSIC_YAKUMAN, ...EMA16_MIXED_YAKUMAN].find(y => y.checker(classicHandPossibility.groups as ClassicHandPattern, roundProps));
    if (yakuman != null) return {
      groups: classicHandPossibility.groups,
      han: 0,
      fu: 0,
      yakuman: 1,
      yaku: [yakuman],
      dora: 0
    }
  }

  // Resolves normal yaku for each possibility
  const hands: RiichiMahjongHandWithoutScore[] = [];
  for (let chiiToitsuHandPossibility of chiiToitsuHandPossibilities) {
    const yakus = [EMA16_NORMAL_CHII_TOITSU_YAKU, ...EMA16_NORMAL_MIXED_YAKU].filter(y => y.checker(chiiToitsuHandPossibility.groups as ChiiToitsuHandPattern, roundProps));
    if (yakus.length > 0) {
      const han = yakus.map(y => y.concealedMajoration ? y.han + 1 : y.han).reduce((a, b) => a + b, 0);
      hands.push({
        groups: chiiToitsuHandPossibility.groups,
        han,
        yakuman: 0,
        fu: 25,
        yaku: yakus,
        dora: 0
      })
    }
  }
  for (let classicHandPossibility of classicHandPossibilities) {
    const yakus = [...EMA16_NORMAL_CLASSIC_YAKU, ...EMA16_NORMAL_MIXED_YAKU].filter(y => y.checker(classicHandPossibility.groups as ClassicHandPattern, roundProps));
    if (yakus.length > 0) {
      const concealed = classicHandPossibility.groups.every(g => g.state === MahjongGroupState.HIDDEN);
      const han = yakus.map(y => concealed && y.concealedMajoration ? y.han + 1 : y.han).reduce((a, b) => a + b, 0);
      hands.push({
        groups: classicHandPossibility.groups,
        han,
        yakuman: 0,
        fu: countFu(classicHandPossibility.groups as ClassicHandPattern, yakus.map(y => y.name), roundProps),
        yaku: yakus,
        dora: 0,
      })
    }
  }

  // Extract best hand
  if (hands.length === 0) return null;
  hands.sort((h1, h2) => {
    const hanDelta = h1.han - h2.han;
    if (hanDelta !== 0) return hanDelta;
    return h1.fu - h2.fu;
  })
  const bestHand = hands.at(-1)!;
  const dorasCount = countDoras(tiles, roundProps);
  bestHand.han += dorasCount;
  bestHand.dora = dorasCount;
  return bestHand;
}

function countFu(groups: ClassicHandPattern, yakus: string[], roundProps?: RoundProps): number {
  const concealed = groups.every(g => g.state === MahjongGroupState.HIDDEN);
  const baseFu = concealed && (roundProps?.winningKind === WINNING_KIND.TSUMO || roundProps?.winningKind === WINNING_KIND.RINSHAN) ? 20 : 30;
  const triples = groups.filter(g => g.type === GroupType.TRIPLE);
  const openOrdinaryTriples = triples.filter(g => g.state === MahjongGroupState.OPEN && isOrdinary(g.tiles[0])).length;
  const openNonOrdinaryTriples = triples.filter(g => g.state === MahjongGroupState.OPEN && !isOrdinary(g.tiles[0])).length;
  const concealedOrdinaryTriples = triples.filter(g => g.state === MahjongGroupState.HIDDEN && isOrdinary(g.tiles[0])).length;
  const concealedNonOrdinaryTriples = triples.filter(g => g.state === MahjongGroupState.HIDDEN && !isOrdinary(g.tiles[0])).length;
  const triplesFu = openOrdinaryTriples * 2 + concealedOrdinaryTriples * 4 + openNonOrdinaryTriples * 4 + concealedNonOrdinaryTriples * 8;
  const quads = groups.filter(g => g.type === GroupType.QUAD);
  const openOrdinaryQuads = quads.filter(g => g.state === MahjongGroupState.OPEN && isOrdinary(g.tiles[0])).length;
  const openNonOrdinaryQuads = quads.filter(g => g.state === MahjongGroupState.OPEN && !isOrdinary(g.tiles[0])).length;
  const concealedOrdinaryQuads = quads.filter(g => g.state === MahjongGroupState.HIDDEN && isOrdinary(g.tiles[0])).length;
  const concealedNonOrdinaryQuads = quads.filter(g => g.state === MahjongGroupState.HIDDEN && !isOrdinary(g.tiles[0])).length;
  const quadsFu = openOrdinaryQuads * 8 + concealedOrdinaryQuads * 16 + openNonOrdinaryQuads * 16 + concealedNonOrdinaryQuads * 32;
  const double = groups.find(g => g.type === GroupType.DOUBLE)!;
  const dragonDouble = double.tiles[0].tile.family === TILE_FAMILY.dragon;
  const playerWindDouble = double.tiles[0].tile.code === roundProps?.playerWind;
  const roundWindDouble = double.tiles[0].tile.code === roundProps?.roundWind;
  const winningGroup = groups.find(g => g.tiles.some(t => t.modificators.includes(MahjongTileModificator.WINNING)));
  const winningTile = winningGroup?.tiles.find(t => t.modificators.includes(MahjongTileModificator.WINNING));
  const winningTileIndex = winningGroup?.tiles.indexOf(winningTile!);
  const doubleWaitWin = winningGroup?.type === GroupType.DOUBLE;
  const singleSideWaitWin = winningTile != null
    && winningGroup!.type === GroupType.SEQUENCE
    && (winningTile.tile.code % 10 === 3 && winningTileIndex === 2 || winningTile.tile.code === 7 % 10 && winningTileIndex === 0);
  const middleWaitWin = winningTile != null
    && winningGroup!.type === GroupType.SEQUENCE
    && winningTileIndex === 1;
  const tsumoNoPinfu = (roundProps?.winningKind === WINNING_KIND.TSUMO || roundProps?.winningKind === WINNING_KIND.RINSHAN)
    && !yakus.includes(Pinfu.name);
  let total = baseFu + triplesFu + quadsFu + 2 * (+dragonDouble + +playerWindDouble + +roundWindDouble + +doubleWaitWin + +singleSideWaitWin + +middleWaitWin + +tsumoNoPinfu);
  if (total === 20 && groups.some(g => g.state === MahjongGroupState.OPEN)) total += 2; // Open Pinfu
  return roundUp(total, 10);
}

function countDoras(tiles: MahjongTile[], roundProps?: RoundProps): number {
  const doraCodes = [...roundProps?.dora ?? [], ...roundProps?.uraDora ?? []]
    .map(marker => nextTile(marker))
    .filter(tile => tile != null)
    .map(tile => tile!.code)
  if (doraCodes.length === 0) return 0;
  return tiles
    .filter(tile => doraCodes.includes(tile.tile.code))
    .length;
}
