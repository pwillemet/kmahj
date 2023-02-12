import { RiichiScore } from './riichi.model'
import { roundUp } from '../../global/math'

export function RiichiScoreCalculator(yakuman: number, han: number, fu: number): RiichiScore {
  if (yakuman > 0) {
    return {
      east: 48000 * yakuman,
      other: {
        ron: 32000 * yakuman,
        tsumo: {
          east: 16000 * yakuman,
          other: 8000 * yakuman
        }
      }
    }
  } else if (han >= 11) {
    return {
      east: 36000,
      other: {
        ron: 24000,
        tsumo: {
          east: 12000,
          other: 6000
        }
      }
    }
  } else if (han >= 8) {
    return {
      east: 24000,
      other: {
        ron: 16000,
        tsumo: {
          east: 8000,
          other: 4000
        }
      }
    }
  } else if (han >= 6) {
    return {
      east: 18000,
      other: {
        ron: 12000,
        tsumo: {
          east: 6000,
          other: 3000
        }
      }
    }
  } else if (han === 5) {
    return {
      east: 12000,
      other: {
        ron: 8000,
        tsumo: {
          east: 4000,
          other: 2000
        }
      }
    }
  } else {
    const baseFigure = Math.min(2000, fu * (2 ** (han + 2)));
    const baseFigureEast = baseFigure * 2;
    const otherPaymentRon = roundUp(2 * baseFigure + baseFigureEast, 100);
    const otherPaymentOther = roundUp(baseFigure, 100);
    const otherPaymentEast = roundUp(baseFigureEast, 100);
    const eastPayment = roundUp(baseFigureEast * 3, 100);
    return {
      east: eastPayment,
      other: {
        ron: otherPaymentRon,
        tsumo: {
          other: otherPaymentOther,
          east: otherPaymentEast
        }
      }
    }
  }

}
