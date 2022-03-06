
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IMutation {
    login(email: string, password: string): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;
    verifyLogin(email: string, password: string, code: string): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;
    register(email: string, password: string, firstName: string, lastName: string): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;
    requestPasswordReset(email: string): Nullable<RequestPasswordResetResponse> | Promise<Nullable<RequestPasswordResetResponse>>;
    resetPassword(code: string, password: string): Nullable<ResetPasswordResponse> | Promise<Nullable<ResetPasswordResponse>>;
    createName(name: string): Name | Promise<Name>;
}

export interface LoginResponse {
    success: boolean;
    needToVerify?: Nullable<boolean>;
    token?: Nullable<string>;
    user?: Nullable<User>;
}

export interface RequestPasswordResetResponse {
    email: string;
}

export interface ResetPasswordResponse {
    success: boolean;
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
