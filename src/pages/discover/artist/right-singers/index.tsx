import type { hotSingersType, singerRankType } from "@/service/api/artist";
import React, { memo, useEffect, useState } from "react";
import { getHotSingers, getSingerRank } from "@/service/api/artist";
import styles from "./style.less";

import TopTitle from "@/components/top-title";
import RecommendItem from "@/components/recommend-item";

const RightSingers = memo(() => {
  const [hotSingers, setHotSingers] = useState<hotSingersType["artists"]>([]);
  const [singerRank, setSingerRank] = useState<
    singerRankType["list"]["artists"]
  >([]);
  useEffect(() => {
    getHotSingers().then((res) => {
      setHotSingers(res.artists);
    });

    getSingerRank().then((res) => {
      console.log("res", res);
      setSingerRank(res.list.artists);
    });
  }, []);

  return (
    <div className={styles["right-singers"]}>
      <TopTitle
        icon={false}
        title="热门歌手"
        // renderMore={<div>更多&gt;</div>}
      />
      <div className="content">
        {hotSingers.map((item) => {
          return <RecommendItem {...item} key={item.id} />;
        })}
      </div>

      <div className="rank">
        {singerRank.map((item) => {
          return (
            <div key={item.id} className="rank-item">
              <span>{item.name}</span>
              <span className="sprite_icon2 singer-icon"></span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default RightSingers;
