
export interface NewError extends Error {
    name: string;
    message: string;
    stack?: string;
}