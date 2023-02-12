export class ResolverError extends Error {
  constructor(reason?: string) {
    super(reason);
    this.name = "ResolverError";
  }
}
