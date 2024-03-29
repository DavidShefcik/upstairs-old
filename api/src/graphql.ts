
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IMutation {
    login(email: string, password: string): LoginResponse | Promise<LoginResponse>;
    verifyLogin(email: string, password: string, code: string): LoginResponse | Promise<LoginResponse>;
    register(email: string, password: string, firstName: string, lastName: string): TokenResponse | Promise<TokenResponse>;
    requestPasswordReset(email: string): SuccessResponse | Promise<SuccessResponse>;
    resetPassword(code: string, password: string): SuccessResponse | Promise<SuccessResponse>;
    logout(): SuccessResponse | Promise<SuccessResponse>;
    refreshAccessToken(): TokenResponse | Promise<TokenResponse>;
    createName(name: string): Name | Promise<Name>;
}

export interface LoginResponse {
    success: boolean;
    needToVerify?: Nullable<boolean>;
    token?: Nullable<string>;
    user?: Nullable<User>;
}

export interface SuccessResponse {
    success: boolean;
}

export interface TokenResponse {
    token: boolean;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
}

export interface IQuery {
    allNames(): Name[] | Promise<Name[]>;
    name(name: string): Nullable<Name> | Promise<Nullable<Name>>;
    currentUser(): User | Promise<User>;
}

export interface Name {
    id: string;
    name: string;
}

type Nullable<T> = T | null;
