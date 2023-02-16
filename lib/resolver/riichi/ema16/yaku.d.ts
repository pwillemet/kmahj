import { ChiiToitsuYaku, ClassicYaku, MixedYaku, Yaku } from '../yaku/yaku.model';
export type Ema16Yakuman<T extends Yaku> = T & {
    yakuman: true;
};
export type Ema16NormalYaku<T extends Yaku> = T & {
    yakuman: false;
    han: number;
    concealedMajoration: boolean;
};
export type Ema16Yaku = Ema16Yakuman<ClassicYaku> | Ema16Yakuman<MixedYaku> | Ema16NormalYaku<ClassicYaku> | Ema16NormalYaku<ChiiToitsuYaku> | Ema16NormalYaku<MixedYaku>;
export declare const EMA16_MIXED_YAKUMAN: Ema16Yakuman<MixedYaku>[];
export declare const EMA16_CLASSIC_YAKUMAN: Ema16Yakuman<ClassicYaku>[];
export declare const EMA16_NORMAL_CHII_TOITSU_YAKU: Ema16NormalYaku<ChiiToitsuYaku>;
export declare const EMA16_NORMAL_MIXED_YAKU: Ema16NormalYaku<MixedYaku>[];
export declare const EMA16_NORMAL_CLASSIC_YAKU: Ema16NormalYaku<ClassicYaku>[];
