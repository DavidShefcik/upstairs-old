
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IMutation {
    login(email: string, password: string): TokenResponse | Promise<TokenResponse>;
    verifyLogin(email: string, password: string, code: string): TokenResponse | Promise<TokenResponse>;
    register(email: string, password: string, firstName: string, lastName: string): LoginResponse | Promise<LoginResponse>;
    requestPasswordReset(email: string): RequestPasswordResetResponse | Promise<RequestPasswordResetResponse>;
    resetPassword(code: string, password: string): ResetPasswordResponse | Promise<ResetPasswordResponse>;
    createName(name: string): Name | Promise<Name>;
}

export interface LoginResponse {
    token?: Nullable<string>;
    needToVerify?: Nullable<boolean>;
}

export interface TokenResponse {
    token?: Nullable<string>;
}

export interface RequestPasswordResetResponse {
    email: string;
}

export interface ResetPasswordResponse {
    success: boolean;
}

export interface IQuery {
    allNames(): Name[] | Promise<Name[]>;
    name(name: string): Nullable<Name> | Promise<Nullable<Name>>;
}

export interface Name {
    id: string;
    name: string;
}

type Nullable<T> = T | null;
