import { KolnerAdressenEntityBase } from '../KolnerAdressenEntityBase';
import type { KolnerAdressenSDK } from '../KolnerAdressenSDK';
import type { Control } from '../types';
import type { DatastoreSearch, DatastoreSearchLoadMatch } from '../KolnerAdressenTypes';
declare class DatastoreSearchEntity extends KolnerAdressenEntityBase<DatastoreSearch> {
    constructor(client: KolnerAdressenSDK, entopts: any);
    make(this: DatastoreSearchEntity): DatastoreSearchEntity;
    load(this: any, reqmatch?: DatastoreSearchLoadMatch, ctrl?: Control): Promise<DatastoreSearchEntity>;
}
export { DatastoreSearchEntity };
