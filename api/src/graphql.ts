
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    allNames(): Name[] | Promise<Name[]>;
    name(name: string): Nullable<Name> | Promise<Nullable<Name>>;
}

export interface IMutation {
    createName(name: string): Name | Promise<Name>;
}

export interface Name {
    id: string;
    name: string;
}

type Nullable<T> = T | null;
