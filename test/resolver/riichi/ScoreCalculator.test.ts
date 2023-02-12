import { RiichiScoreCalculator } from '../../../lib'
import { describe, expect, test } from 'vitest'

describe.each([
  { yakuman: 0, han: 1, fu: 30, expected: { east: 1500, other: { ron: 1000, tsumo: { other: 300, east: 500 } } } },
  { yakuman: 0, han: 1, fu: 40, expected: { east: 2000, other: { ron: 1300, tsumo: { other: 400, east: 700 } } } },
  { yakuman: 0, han: 1, fu: 50, expected: { east: 2400, other: { ron: 1600, tsumo: { other: 400, east: 800 } } } },
  { yakuman: 0, han: 1, fu: 60, expected: { east: 2900, other: { ron: 2000, tsumo: { other: 500, east: 1000 } } } },
  { yakuman: 0, han: 1, fu: 70, expected: { east: 3400, other: { ron: 2300, tsumo: { other: 600, east: 1200 } } } },
  { yakuman: 0, han: 2, fu: 20, expected: { east: 2000, other: { ron: 1300, tsumo: { other: 400, east: 700 } } } },
  { yakuman: 0, han: 2, fu: 30, expected: { east: 2900, other: { ron: 2000, tsumo: { other: 500, east: 1000 } } } },
  { yakuman: 0, han: 2, fu: 40, expected: { east: 3900, other: { ron: 2600, tsumo: { other: 700, east: 1300 } } } },
  { yakuman: 0, han: 2, fu: 50, expected: { east: 4800, other: { ron: 3200, tsumo: { other: 800, east: 1600 } } } },
  { yakuman: 0, han: 2, fu: 60, expected: { east: 5800, other: { ron: 3900, tsumo: { other: 1000, east: 2000 } } } },
  { yakuman: 0, han: 2, fu: 70, expected: { east: 6800, other: { ron: 4500, tsumo: { other: 1200, east: 2300 } } } },
  { yakuman: 0, han: 3, fu: 20, expected: { east: 3900, other: { ron: 2600, tsumo: { other: 700, east: 1300 } } } },
  { yakuman: 0, han: 3, fu: 25, expected: { east: 4800, other: { ron: 3200, tsumo: { other: 800, east: 1600 } } } },
  { yakuman: 0, han: 3, fu: 30, expected: { east: 5800, other: { ron: 3900, tsumo: { other: 1000, east: 2000 } } } },
  { yakuman: 0, han: 3, fu: 40, expected: { east: 7700, other: { ron: 5200, tsumo: { other: 1300, east: 2600 } } } },
  { yakuman: 0, han: 3, fu: 50, expected: { east: 9600, other: { ron: 6400, tsumo: { other: 1600, east: 3200 } } } },
  { yakuman: 0, han: 3, fu: 60, expected: { east: 11600, other: { ron: 7700, tsumo: { other: 2000, east: 3900 } } } },
  { yakuman: 0, han: 3, fu: 70, expected: { east: 12000, other: { ron: 8000, tsumo: { other: 2000, east: 4000 } } } },
  { yakuman: 0, han: 4, fu: 20, expected: { east: 7700, other: { ron: 5200, tsumo: { other: 1300, east: 2600 } } } },
  { yakuman: 0, han: 4, fu: 25, expected: { east: 9600, other: { ron: 6400, tsumo: { other: 1600, east: 3200 } } } },
  { yakuman: 0, han: 4, fu: 30, expected: { east: 11600, other: { ron: 7700, tsumo: { other: 2000, east: 3900 } } } },
  { yakuman: 0, han: 4, fu: 40, expected: { east: 12000, other: { ron: 8000, tsumo: { other: 2000, east: 4000 } } } },
  { yakuman: 0, han: 4, fu: 50, expected: { east: 12000, other: { ron: 8000, tsumo: { other: 2000, east: 4000 } } } },
  { yakuman: 0, han: 4, fu: 60, expected: { east: 12000, other: { ron: 8000, tsumo: { other: 2000, east: 4000 } } } },
  { yakuman: 0, han: 4, fu: 70, expected: { east: 12000, other: { ron: 8000, tsumo: { other: 2000, east: 4000 } } } },
  { yakuman: 0, han: 5, fu: 20, expected: { east: 12000, other: { ron: 8000, tsumo: { other: 2000, east: 4000 } } } },
  { yakuman: 0, han: 6, fu: 20, expected: { east: 18000, other: { ron: 12000, tsumo: { other: 3000, east: 6000 } } } },
  { yakuman: 0, han: 7, fu: 20, expected: { east: 18000, other: { ron: 12000, tsumo: { other: 3000, east: 6000 } } } },
  { yakuman: 0, han: 8, fu: 20, expected: { east: 24000, other: { ron: 16000, tsumo: { other: 4000, east: 8000 } } } },
  { yakuman: 0, han: 9, fu: 20, expected: { east: 24000, other: { ron: 16000, tsumo: { other: 4000, east: 8000 } } } },
  { yakuman: 0, han: 10, fu: 20, expected: { east: 24000, other: { ron: 16000, tsumo: { other: 4000, east: 8000 } } } },
  { yakuman: 0, han: 11, fu: 20, expected: { east: 36000, other: { ron: 24000, tsumo: { other: 6000, east: 12000 } } } },
  { yakuman: 0, han: 12, fu: 20, expected: { east: 36000, other: { ron: 24000, tsumo: { other: 6000, east: 12000 } } } },
  { yakuman: 1, han: 0, fu: 20, expected: { east: 48000, other: { ron: 32000, tsumo: { other: 8000, east: 16000 } } } },
])(`Riichi Score Calculator`, ({ yakuman, han, fu, expected }) => {
  test(`yakuman: ${yakuman} , han: ${han} , fu : ${fu}`, () => {
    const score = RiichiScoreCalculator(yakuman, han, fu);
    expect(score).toEqual(expected);
  })
})

