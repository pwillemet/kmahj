import { MahjongHand, MahjongTile, TileCode, TileRef } from '../../core';
import { Yaku } from './yaku';
export type WINNING_KIND = "TSUMO" | "RON" | "RINSHAN" | "CHANKAN";
export declare const WINNING_KIND: {
    TSUMO: WINNING_KIND;
    RON: WINNING_KIND;
    RINSHAN: WINNING_KIND;
    CHANKAN: WINNING_KIND;
};
export type RoundProps = {
    playerWind: TileCode;
    roundWind: TileCode;
    dora: TileRef;
    uraDora: TileRef;
    winningKind: WINNING_KIND;
    discard: MahjongTile[];
    discardTouched: boolean;
    riichi: boolean;
    doubleRiichi: boolean;
    firstTurnAfterRiichi: boolean;
    lastTile: boolean;
    firstTurn: boolean;
};
export type RiichiScore = {
    east: number;
    other: {
        ron: number;
        tsumo: {
            east: number;
            other: number;
        };
    };
};
export type RiichiMahjongHandWithoutScore = MahjongHand & {
    yaku: Yaku[];
    yakuman: number;
    han: number;
    fu: number;
};
export type RiichiMahjongHand = MahjongHand & RiichiMahjongHandWithoutScore & {
    score: RiichiScore;
};
