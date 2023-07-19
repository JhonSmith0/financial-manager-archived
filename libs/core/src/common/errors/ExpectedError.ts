export default abstract class ExpectedError extends Error {
    public readonly expected = true
    public abstract code: number
}
