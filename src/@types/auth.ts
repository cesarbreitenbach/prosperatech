export interface IUser {
    id: number; 
    name: string;
    email: string;
    admin: boolean; 
    walletAddress: string;
    token: string;
  }

export interface ITokenProps {
    id: number; 
    name: string;
    email: string;
    admin: boolean; 
    walletAddress: string;
    iat:number
}

export interface LoginProps {
    email: string;
    password: string;
}