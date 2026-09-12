export interface Address {
    description?: string;
    format?: string;
    id?: string;
    name?: string;
    url?: string;
}
export interface AddressListMatch {
    format?: string;
}
export interface DatastoreSearch {
    limit?: number;
    offset?: number;
    records?: any[];
    total?: number;
}
export interface DatastoreSearchLoadMatch {
    field?: string;
    filter?: string;
    limit?: number;
    offset?: number;
    q?: string;
    resource_id: string;
}
