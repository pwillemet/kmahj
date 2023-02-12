import { MahjongTile, TileNumberStr } from '../core'
import { MpszModificator } from './mpsz'

export type ParsedTile = {
  number: TileNumberStr;
  modificators: MpszModificator[]
  winning: boolean;
}

export type ParsedGroup = {
  tiles: MahjongTile[];
}

export type ParsedHand = {
  groups: ParsedGroup[];
}

export type Parser = (input: string) => ParsedHand;
