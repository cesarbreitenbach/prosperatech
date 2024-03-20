export interface IUser {
    id: number; 
    name: string;
    email: string;
    admin: boolean; 
    active: boolean;
    resetPassword: boolean;
    walletAddress: string;
    token: string;
  }

export interface ITokenProps {
    id: number; 
    name: string;
    email: string;
    admin: boolean; 
    active: boolean;
    resetPassword: boolean;
    walletAddress: string;
    iat:number
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface SignupProps {
    name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface ChangePasswordProps {
    email?: string;
    name?: string;
    password: string;
    confirmPassword: string;
	oldPassword?: string;
}