export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    last_login: Date;
    store_id: string; // This should be a reference to the wallet document ID
    verified: boolean;
    token: string;
}
  
export interface UserInputDTO { 
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export interface UserLoginDTO { 
    email: string;
    password: string;
};

export interface IUserDocument extends IUser, Document { }; 
