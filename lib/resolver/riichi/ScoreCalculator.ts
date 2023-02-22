import { RiichiScore, RoundProps } from './riichi.model'
import { roundUp } from '../../global/math'

export function RiichiScoreCalculator(yakuman: number, han: number, fu: number, roundProps?: RoundProps): RiichiScore {
  const fullCountersScore = (roundProps?.counters ?? 0) * 300;
  const sharedCountersScore = (roundProps?.counters ?? 0) * 100;
  const claimableRiichiScore = (roundProps?.claimableRiichiBets ?? 0) * 1000;
  if (yakuman > 0) {
    return {
      east: 48000 * yakuman + fullCountersScore + claimableRiichiScore,
      other: {
        ron: 32000 * yakuman + fullCountersScore + claimableRiichiScore,
        tsumo: {
          east: 16000 * yakuman + sharedCountersScore + claimableRiichiScore,
          other: 8000 * yakuman + sharedCountersScore + claimableRiichiScore
        }
      }
    }
  } else if (han >= 11) {
    return {
      east: 36000 + fullCountersScore + claimableRiichiScore,
      other: {
        ron: 24000 + fullCountersScore + claimableRiichiScore,
        tsumo: {
          east: 12000 + sharedCountersScore + claimableRiichiScore,
          other: 6000 + sharedCountersScore + claimableRiichiScore
        }
      }
    }
  } else if (han >= 8) {
    return {
      east: 24000 + fullCountersScore + claimableRiichiScore,
      other: {
        ron: 16000 + fullCountersScore + claimableRiichiScore,
        tsumo: {
          east: 8000 + sharedCountersScore + claimableRiichiScore,
          other: 4000 + sharedCountersScore + claimableRiichiScore
        }
      }
    }
  } else if (han >= 6) {
    return {
      east: 18000 + fullCountersScore + claimableRiichiScore,
      other: {
        ron: 12000 + fullCountersScore + claimableRiichiScore,
        tsumo: {
          east: 6000 + sharedCountersScore + claimableRiichiScore,
          other: 3000 + sharedCountersScore + claimableRiichiScore
        }
      }
    }
  } else if (han === 5) {
    return {
      east: 12000 + fullCountersScore + claimableRiichiScore,
      other: {
        ron: 8000 + fullCountersScore + claimableRiichiScore,
        tsumo: {
          east: 4000 + sharedCountersScore + claimableRiichiScore,
          other: 2000 + sharedCountersScore + claimableRiichiScore
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
      east: eastPayment + fullCountersScore + claimableRiichiScore,
      other: {
        ron: otherPaymentRon + fullCountersScore + claimableRiichiScore,
        tsumo: {
          other: otherPaymentOther + sharedCountersScore + claimableRiichiScore,
          east: otherPaymentEast + sharedCountersScore + claimableRiichiScore
        }
      }
    }
  }

}
