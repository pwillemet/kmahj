import { Ema16Resolver } from './resolver';
import { MpszParser } from './parser';
export class Kmahj {
    resolver;
    parser;
    constructor(resolver, parser) {
        this.resolver = resolver;
        this.parser = parser;
    }
    withParser(parser) {
        this.parser = parser;
        return this;
    }
    resolve(input, roundProps) {
        const parsed = this.parser(input);
        return this.resolver(parsed, roundProps);
    }
}
export const kmahj = {
    ema2016: new Kmahj(Ema16Resolver, MpszParser)
};
