export class ResolverError extends Error {
    constructor(reason) {
        super(reason);
        this.name = "ResolverError";
    }
}
