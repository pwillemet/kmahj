import { MahjongHand, MahjongTile, TileCode, TileRef } from '../../core'
import { Yaku } from './yaku'

export type WINNING_KIND = "TSUMO" | "RON" | "RINSHAN" | "CHANKAN";
export const WINNING_KIND = {
  TSUMO: "TSUMO" as WINNING_KIND,
  RON: "RON" as WINNING_KIND,
  RINSHAN: "RINSHAN" as WINNING_KIND,
  CHANKAN: "CHANKAN" as WINNING_KIND,
}

export type RoundProps = {
  playerWind?: TileCode,
  roundWind?: TileCode,
  dora?: TileRef[],
  uraDora?: TileRef[],
  winningKind?: WINNING_KIND,
  discard?: MahjongTile[],
  discardTouched?: boolean,
  riichi?: boolean,
  doubleRiichi?: boolean,
  firstTurnAfterRiichi?: boolean,
  lastTile?: boolean,
  firstTurn?: boolean,
  counters?: number,
  claimableRiichiBets?: number
}

export type RiichiScore = {
  east: number;
  other: {
    ron: number;
    tsumo: {
      east: number;
      other: number;
    }
  }
}

export type RiichiMahjongHandWithoutScore = MahjongHand & {
  yaku: Yaku[];
  yakuman: number;
  han: number;
  fu: number;
  dora: number;
}

export type RiichiMahjongHand = RiichiMahjongHandWithoutScore & {
  score: RiichiScore;
}
