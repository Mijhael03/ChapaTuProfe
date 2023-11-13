export interface BaseCommandHandler<R, T> {
    handle(command: T): R
}