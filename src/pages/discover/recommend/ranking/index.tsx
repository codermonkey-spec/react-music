import type { rankingInfoType } from "@/service/api/recommend";

import React, { memo } from "react";
import styles from "./style.less";
import TopTitle from "@/components/top-title";
import RankingSongsList from "./ranking-songs-list";

type rankingPropsType = {
  topData: rankingInfoType;
  newData: rankingInfoType;
  originData: rankingInfoType;
};

const Ranking: React.FC<rankingPropsType> = memo(
  ({ topData = {}, newData = {}, originData = {} }) => {
    return (
      <div className={styles.ranking}>
        <TopTitle title="榜单" />
        <div className="ranking-content">
          <RankingSongsList data={topData} />
          <RankingSongsList data={newData} />
          <RankingSongsList data={originData} />
        </div>
      </div>
    );
  }
);

export default Ranking;
