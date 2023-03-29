import type { playListType } from "@/service/api/play-list";
import React, { memo, useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { getPlayList } from "@/service/api/play-list";
import styles from "./style.less";

import TopTitle from "@/components/top-title";
import CatBtn from "./cat-btn";
import RecommendItem from "@/components/recommend-item";

const PlayList = memo(() => {
  const [cat, setCat] = useState("全部");

  const [dataSource, setDataSource] = useState<playListType["playlists"]>([]);
  const transitions = useTransition(dataSource, {
    trail: 200,
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
  });

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
          {transitions((style, item) => (
            <animated.div style={style} key={item.id} className="wrap">
              <RecommendItem {...item} key={item.id} />
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default PlayList;
