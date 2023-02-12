export class ParseError extends Error {
  constructor(reason?: string) {
    super(reason);
    this.name = "ParseError";
  }
}
