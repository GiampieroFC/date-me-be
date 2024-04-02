import morgan from 'morgan'

export enum Logs {
    Common = 'common',
    Combined = 'combined',
    Dev = 'dev',
    Short = 'short',
    Tiny = 'tiny'
}

export const logger = (l: Logs) => {
    return morgan(l);
}