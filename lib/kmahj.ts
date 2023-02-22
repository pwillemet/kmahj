import { Resolver, RiichiMahjongHand, RoundProps, RiichiEma16Resolver } from './resolver'
import { MahjongHand } from './core'
import { MpszParser, Parser } from './parser'

export class Kmahj<T extends MahjongHand, P extends Object> {

  constructor(public resolver: Resolver<T, P>, public parser: Parser) {}

  withParser(parser: Parser): Kmahj<T, P> {
    this.parser = parser;
    return this;
  }

  canResolve(input: string): boolean {
    return this.parser.canParse(input);
  }

  resolve(input: string, roundProps?: P): T | null {
    const parsed = this.parser.parse(input);
    return this.resolver(parsed, roundProps);
  }

}

export const kmahj = {
  riichiEma2016: new Kmahj<RiichiMahjongHand, RoundProps>(RiichiEma16Resolver, MpszParser)
}
