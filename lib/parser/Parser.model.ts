import { MahjongTile } from '../core'

export type ParsedGroup = {
  tiles: MahjongTile[];
}

export type ParsedHand = {
  groups: ParsedGroup[];
}

export type Parser = {
  parse: (input: string) => ParsedHand;
  canParse: (input: string) => boolean;
}
