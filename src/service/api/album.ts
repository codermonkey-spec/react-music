import { request } from "..";
import { requestApi } from "@/types";

export type newAlbumItemType = {
  /** 封面图 */
  picUrl: string;
  artists: {
    /** 专辑作者名称 */
    name: string;
    [key: string]: any;
  }[];
  /** 专辑名称 */
  name: string;
  [key: string]: any;
};

export type newAlbumListType = {
  albums: newAlbumItemType[];
  code: number;
  total: number;
};

/** 新碟上架 */
export const getNewAlbum: requestApi<newAlbumListType> = (
  offset: number = 0,
  limit: number = 10
) => {
  return request("/album/newest", {
    method: "get",
    params: {
      offset,
      limit,
    },
  });
};

/** 全部新碟 */

export const getAllNewAlbum: requestApi<{
  total?: number;
  albums?: newAlbumItemType[];
}> = (area: string = "KR", limit: number = 10, offset = 35) => {
  return request("/album/new", {
    method: "get",
    params: {
      area,
      limit,
      offset,
    },
  });
};
