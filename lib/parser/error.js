export class ParseError extends Error {
    constructor(reason) {
        super(reason);
        this.name = "ParseError";
    }
}
