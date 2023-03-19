import type { newAlbumItemType } from "@/service/api/album";

export const formatPlayCount = (playCount: number) => {
  if (playCount > 100000000) {
    return (playCount / 100000000).toFixed(0) + "亿";
  } else if (playCount > 10000) {
    return (playCount / 10000).toFixed(0) + "万";
  } else {
    return playCount;
  }
};

export const formatArtistName = (nameList: newAlbumItemType["artists"]) => {
  console.log("nameList", nameList);
  if (nameList.length === 0) {
    return nameList[0].name;
  } else {
    return nameList.map((item, index) => {
      return item.name + (index === nameList.length - 1) ? "" : "/";
    });
  }
};
