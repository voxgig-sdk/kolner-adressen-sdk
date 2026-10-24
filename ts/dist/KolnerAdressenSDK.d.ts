import { AddressEntity } from './entity/AddressEntity';
import { DatastoreSearchEntity } from './entity/DatastoreSearchEntity';
export type * from './KolnerAdressenTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { KolnerAdressenEntityBase } from './KolnerAdressenEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class KolnerAdressenSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Address(entopts?: Record<string, any>): AddressEntity;
    DatastoreSearch(entopts?: Record<string, any>): DatastoreSearchEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): KolnerAdressenSDK;
    tester(testopts?: any, sdkopts?: any): KolnerAdressenSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof KolnerAdressenSDK;
export { stdutil, config, BaseFeature, KolnerAdressenEntityBase, KolnerAdressenSDK, SDK, };
export type { DirectResult };
