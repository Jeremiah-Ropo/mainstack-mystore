export interface IStore {
    name: string;
    user_id: string;
    description: string;
    product_id: string;
    number_of_product: number;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
    };
}

export interface IStoreInputDTO {
    name: string;
    description: string;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
    };
}

export interface IStoreDocument extends IStore, Document { };

