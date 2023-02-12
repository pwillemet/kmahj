import { Resolver, RiichiMahjongHand, RoundProps, Ema16Resolver } from './resolver'
import { MahjongHand } from './core'
import { MpszParser, Parser } from './parser'

export class Kmahj<T extends MahjongHand, P extends Object> {

  constructor(public resolver: Resolver<T, P>, public parser: Parser) {}

  withParser(parser: Parser): Kmahj<T, P> {
    this.parser = parser;
    return this;
  }

  resolve(input: string, roundProps?: P): T | null {
    const parsed = this.parser(input);
    return this.resolver(parsed, roundProps);
  }

}

export const kmahj = {
  ema2016: new Kmahj<RiichiMahjongHand, RoundProps>(Ema16Resolver, MpszParser)
}
