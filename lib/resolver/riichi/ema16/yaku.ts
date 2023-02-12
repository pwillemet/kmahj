import { ChiiToitsuYaku, ClassicYaku, MixedYaku, Yaku } from '../yaku/yaku.model'
import { ChuurenPoutou } from '../yaku/ChuurenPoutou'
import { Tenhou } from '../yaku/Tenhou'
import { Chiihou } from '../yaku/Chiihou'
import { Suuankou } from '../yaku/Suuankou'
import { Ryuuiisou } from '../yaku/Ryuuiisou'
import { Chinroutou } from '../yaku/Chinroutou'
import { Tsuuiisou } from '../yaku/Tsuuiisou'
import { Daisangen } from '../yaku/Daisangen'
import { Shousuushii } from '../yaku/Shousuushii'
import { Daisuushii } from '../yaku/Daisuushii'
import { Riichi } from '../yaku/Riichi'
import { MenzenTsumo } from '../yaku/MenzenTsumo'
import { Pinfu } from '../yaku/Pinfu'
import { Iipeikou } from '../yaku/Iipeikou'
import { Tanyao } from '../yaku/Tanyao'
import { Ittsu } from '../yaku/Ittsu'
import { SanshokuDoujun } from '../yaku/SanshokuDoujun'
import { Green, PlayerWind, Red, RoundWind, White } from '../yaku/Yakuhai'
import { Chanta } from '../yaku/Chanta'
import { Rinshan } from '../yaku/Rinshan'
import { Chankan } from '../yaku/Chankan'
import { Haitei } from '../yaku/Haitei'
import { Houtei } from '../yaku/Houtei'
import { SanshokuDoukou } from '../yaku/SanshokuDoukou'
import { Sanankou } from '../yaku/Sanankou'
import { Sankantsu } from '../yaku/Sankantsu'
import { Toitoi } from '../yaku/Toitoi'
import { Honitsu } from '../yaku/Honitsu'
import { Shousangen } from '../yaku/Shousangen'
import { Honroutou } from '../yaku/Honroutou'
import { Junchan } from '../yaku/Junchan'
import { Ryanpeikou } from '../yaku/Ryanpeikou'
import { Renhou } from '../yaku/Renhou'
import { Chinitsu } from '../yaku/Chinitsu'
import { ChiiToitsuUnique } from '../yaku'

export type Ema16Yakuman<T extends Yaku> = T & {
  yakuman: true
}
export type Ema16NormalYaku<T extends Yaku> = T & {
  yakuman: false,
  han: number,
  concealedMajoration: boolean,
}

export type Ema16Yaku = Ema16Yakuman<ClassicYaku> | Ema16Yakuman<MixedYaku> | Ema16NormalYaku<ClassicYaku> | Ema16NormalYaku<ChiiToitsuYaku> | Ema16NormalYaku<MixedYaku>;

export const EMA16_MIXED_YAKUMAN: Ema16Yakuman<MixedYaku>[] = [
  {
    ...Tenhou,
    yakuman: true,
  },
  {
    ...Ryuuiisou,
    yakuman: true,
  },
  {
    ...Chiihou,
    yakuman: true,
  },
  {
    ...Tsuuiisou,
    yakuman: true,
  },
]
export const EMA16_CLASSIC_YAKUMAN: Ema16Yakuman<ClassicYaku>[] = [
  {
    ...ChuurenPoutou,
    yakuman: true,
  },
  {
    ...Suuankou,
    yakuman: true,
  },
  {
    ...Chinroutou,
    yakuman: true,
  },
  {
    ...Daisangen,
    yakuman: true,
  },
  {
    ...Shousuushii,
    yakuman: true,
  },
  {
    ...Daisuushii,
    yakuman: true,
  }
]

export const EMA16_NORMAL_CHII_TOITSU_YAKU: Ema16NormalYaku<ChiiToitsuYaku> = {
  ...ChiiToitsuUnique,
  yakuman: false,
  han: 2,
  concealedMajoration: false
};

export const EMA16_NORMAL_MIXED_YAKU: Ema16NormalYaku<MixedYaku>[] = [
  {
    ...Riichi,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...MenzenTsumo,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...Tanyao,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...Rinshan,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...Chankan,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...Haitei,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...Houtei,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...Honitsu,
    yakuman: false,
    han: 2,
    concealedMajoration: true
  },
  {
    ...Honroutou,
    yakuman: false,
    han: 2,
    concealedMajoration: false
  },
  {
    ...Renhou,
    yakuman: false,
    han: 5,
    concealedMajoration: false
  },
  {
    ...Chinitsu,
    yakuman: false,
    han: 5,
    concealedMajoration: true
  },
]
export const EMA16_NORMAL_CLASSIC_YAKU: Ema16NormalYaku<ClassicYaku>[] = [
  {
    ...Pinfu,
    yakuman: false,
    han: 1,
    concealedMajoration: false,
  },
  {
    ...Iipeikou,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...SanshokuDoujun,
    yakuman: false,
    han: 1,
    concealedMajoration: true
  },
  {
    ...Ittsu,
    yakuman: false,
    han: 1,
    concealedMajoration: true
  },
  {
    ...Red,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...Green,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...White,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...PlayerWind,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...RoundWind,
    yakuman: false,
    han: 1,
    concealedMajoration: false
  },
  {
    ...Chanta,
    yakuman: false,
    han: 1,
    concealedMajoration: true
  },
  {
    ...SanshokuDoukou,
    yakuman: false,
    han: 2,
    concealedMajoration: false
  },
  {
    ...Sanankou,
    yakuman: false,
    han: 2,
    concealedMajoration: false
  },
  {
    ...Sankantsu,
    yakuman: false,
    han: 2,
    concealedMajoration: false
  },
  {
    ...Toitoi,
    yakuman: false,
    han: 2,
    concealedMajoration: false
  },
  {
    ...Shousangen,
    yakuman: false,
    han: 2,
    concealedMajoration: false
  },
  {
    ...Junchan,
    yakuman: false,
    han: 2,
    concealedMajoration: true
  },
  {
    ...Ryanpeikou,
    yakuman: false,
    han: 3,
    concealedMajoration: false
  },
]
