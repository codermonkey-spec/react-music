import { request } from "..";
import { requestApi } from "@/types";

import type { playerType } from "@/store/module/player";

export const getCurrSongs: requestApi<{
  code: number;
  songs: playerType[];
}> = (ids: number) => {
  return request("/song/detail", {
    method: "get",
    params: {
      ids,
    },
  });
};
