import type { playListType } from "@/service/api/play-list";
import React, { memo, useEffect, useState } from "react";
import { getPlayList } from "@/service/api/play-list";
import styles from "./style.less";

import TopTitle from "@/components/top-title";
import CatBtn from "./cat-btn";
import RecommendItem from "@/components/recommend-item";

const PlayList = memo(() => {
  const [cat, setCat] = useState("全部");

  const [dataSource, setDataSource] = useState<playListType["playlists"]>([]);

  useEffect(() => {
    getPlayList(35, "hot", cat).then((res) => {
      const newData = res.playlists.map((item) => ({
        ...item,
        picUrl: item.coverImgUrl,
      }));
      setDataSource(newData);
    });
  }, [cat]);

  return (
    <div className={styles["play-list"]}>
      <div className="wrap-v2 play-list-content">
        <TopTitle
          title={cat}
          icon={false}
          renderTab={() => <CatBtn setCat={setCat} cat={cat} />}
          renderMore={<div>热门</div>}
        />
        <div className="content">
          {dataSource.map((item) => {
            return <RecommendItem {...item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
});

export default PlayList;
