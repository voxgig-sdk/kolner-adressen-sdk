import { KolnerAdressenEntityBase } from '../KolnerAdressenEntityBase';
import type { KolnerAdressenSDK } from '../KolnerAdressenSDK';
import type { Control } from '../types';
import type { Address, AddressListMatch } from '../KolnerAdressenTypes';
declare class AddressEntity extends KolnerAdressenEntityBase<Address> {
    constructor(client: KolnerAdressenSDK, entopts: any);
    make(this: AddressEntity): AddressEntity;
    list(this: any, reqmatch?: AddressListMatch, ctrl?: Control): Promise<AddressEntity[]>;
}
export { AddressEntity };
