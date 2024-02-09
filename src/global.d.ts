/* eslint-disable @typescript-eslint/no-explicit-any */
type ObjectLiteral = Record<string, any>;

declare type Maybe<T> = T | undefined | null;

declare type Uuid = string & { _uuidBrand: undefined };
