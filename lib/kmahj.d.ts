import { Resolver, RiichiMahjongHand, RoundProps } from './resolver';
import { MahjongHand } from './core';
import { Parser } from './parser';
export declare class Kmahj<T extends MahjongHand, P extends Object> {
    resolver: Resolver<T, P>;
    parser: Parser;
    constructor(resolver: Resolver<T, P>, parser: Parser);
    withParser(parser: Parser): Kmahj<T, P>;
    resolve(input: string, roundProps?: P): T | null;
}
export declare const kmahj: {
    ema2016: Kmahj<RiichiMahjongHand, RoundProps>;
};
