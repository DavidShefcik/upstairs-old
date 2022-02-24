
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IMutation {
    login(email: string, password: string): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;
    verifyLogin(email: string, password: string, code: string): Nullable<TokenResponse> | Promise<Nullable<TokenResponse>>;
    register(email: string, password: string, firstName: string, lastName: string): Nullable<TokenResponse> | Promise<Nullable<TokenResponse>>;
    requestPasswordReset(email: string): Nullable<RequestPasswordResetResponse> | Promise<Nullable<RequestPasswordResetResponse>>;
    resetPassword(code: string, password: string): Nullable<ResetPasswordResponse> | Promise<Nullable<ResetPasswordResponse>>;
    createName(name: string): Name | Promise<Name>;
}

export interface LoginResponse {
    success: boolean;
    token?: Nullable<string>;
    needToVerify?: Nullable<boolean>;
}

export interface TokenResponse {
    success: boolean;
    token: string;
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
