import { Context } from './Context';
declare class KolnerAdressenError extends Error {
    isKolnerAdressenError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { KolnerAdressenError };
