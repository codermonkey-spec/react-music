import { request } from "..";
import { requestApi } from "@/types";

export type topListItem = {
  coverImgUrl: string;
  name: string;
  updateFrequency: string;
  /**榜单id */
  id: number;
  [key: string]: any;
};

export type topListType = {
  artistToplist: {
    coverUrl: string;
    name: string;
    [key: string]: any;
  };
  code: number;
  list: topListItem[];
};

export const getTopList: requestApi<topListType> = () => {
  return request("/toplist", {
    method: "get",
  });
};
