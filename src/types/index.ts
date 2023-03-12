import type { AxiosResponse } from "axios";

export type requestApi<T = any, U = any> = () => Promise<
  AxiosResponse<T, U>["data"]
>;
