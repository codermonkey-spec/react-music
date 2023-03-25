import type { AxiosResponse } from "axios";

export type requestApi<T = any, U = any> = (
  ...args: any
) => Promise<AxiosResponse<T, U>["data"]>;

export type DeepPartial<T> = {
  [P in keyof T]?: keyof T[P] extends never ? T[P] : DeepPartial<T[P]>;
};

export type First<T extends any[]> = T extends [] ? never : T[0];

export type TupleToUnion<T extends any[]> = T[number];
