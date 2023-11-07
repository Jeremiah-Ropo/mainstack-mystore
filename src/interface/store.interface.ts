export interface IStore {
    name: string;
    user_id: string;
    description: string;
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

