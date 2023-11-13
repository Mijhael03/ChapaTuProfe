export interface BaseQueryHandler<R, T> {
    handle(query: T): R
}