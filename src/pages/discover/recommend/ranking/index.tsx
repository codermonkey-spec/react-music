import type { rankingInfoType } from "@/service/api/recommend";

import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.less";
import TopTitle from "@/components/top-title";
import RankingSongsList from "./ranking-songs-list";

type rankingPropsType = {
  topData: rankingInfoType;
  newData: rankingInfoType;
  originData: rankingInfoType;
};

const Ranking: React.FC<rankingPropsType> = memo((props) => {
  const navigate = useNavigate();

  const onCoverImgClick = (
    data: rankingInfoType | rankingInfoType | rankingInfoType
  ) => {
    navigate(`/discover/toplist?id=${data.playlist?.id}`);
  };

  return (
    <div className={styles.ranking}>
      <TopTitle title="榜单" />
      <div className="ranking-content">
        {(["topData", "newData", "originData"] as const).map((item) => (
          <RankingSongsList
            data={props[item]}
            onCoverImgClick={onCoverImgClick}
          />
        ))}
      </div>
    </div>
  );
});

export default Ranking;
