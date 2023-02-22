import { describe, expect, test } from 'vitest'
import {
  Chinitsu,
  ChuurenPoutou,
  Ittsu,
  MenzenTsumo,
  MpszParser,
  Pinfu,
  Riichi,
  RoundProps,
  Ryanpeikou,
  WINNING_KIND
} from '../../../../lib'
import { RiichiEma16Resolver } from '../../../../lib/resolver/riichi/ema16'

describe("Ema16Resolver", () => {

  test("Ittsu 2han40", () => {
    const input = "12345689p12344s+7p";
    const parsedHand = MpszParser.parse(input);
    const mahjongHand = RiichiEma16Resolver(parsedHand)!
    const yakus = mahjongHand.yaku.map(y => y.name);
    expect(mahjongHand.han).toBe(2);
    expect(mahjongHand.fu).toBe(40);
    expect(yakus).toEqual([Ittsu.name]);
  })

  test("Riichi Pinfu 2han30", () => {
    const input = "123456p345m2267s+8s";
    const parsedHand = MpszParser.parse(input);
    const mahjongHand = RiichiEma16Resolver(parsedHand, { riichi: true } as RoundProps)!
    const yakus = mahjongHand.yaku.map(y => y.name);
    expect(mahjongHand.han).toBe(2);
    expect(mahjongHand.fu).toBe(30);
    expect(yakus).toEqual([Pinfu.name, Riichi.name]);
  })

  test("Riichi Pinfu Tsumo 3han20", () => {
    const input = "123456p345m2267s+8s";
    const parsedHand = MpszParser.parse(input);
    const mahjongHand = RiichiEma16Resolver(parsedHand, { riichi: true, winningKind: WINNING_KIND.TSUMO } as RoundProps)!
    const yakus = mahjongHand.yaku.map(y => y.name);
    expect(mahjongHand.han).toBe(3);
    expect(mahjongHand.fu).toBe(20);
    expect(yakus).toEqual([Pinfu.name, Riichi.name, MenzenTsumo.name]);
  })

  test("Chuuren Poutou Yakuman", () => {
    const input = "1112345678999s+9s";
    const parsedHand = MpszParser.parse(input);
    const mahjongHand = RiichiEma16Resolver(parsedHand)!
    const yakus = mahjongHand.yaku.map(y => y.name);
    expect(mahjongHand.yakuman).toBe(1);
    expect(yakus).toEqual([ChuurenPoutou.name]);
  })

  test("Hard case : Chinitsu Ryanpeikou 9han30", () => {
    const input = "11112222333344m";
    const parsedHand = MpszParser.parse(input);
    const mahjongHand = RiichiEma16Resolver(parsedHand)!
    const yakus = mahjongHand.yaku.map(y => y.name);
    expect(mahjongHand.han).toBe(9);
    expect(mahjongHand.fu).toBe(30);
    expect(yakus).toEqual([Ryanpeikou.name, Chinitsu.name]);
  })

})
