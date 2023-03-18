import { hotRecommendItem } from "@/service/api/recommend";

import React, { memo } from "react";
import styles from "./style.less";

import TopTitle from "@/components/top-title";
import RecommendItem from "@/components/recommend-item";

const tabs = ["华语", "流行", "摇滚", "民谣", "电子"];

type hotRecommendListType = {
  data: Partial<hotRecommendItem>[];
};

const HotRecommend: React.FC<hotRecommendListType> = memo(({ data }) => {
  return (
    <div className={styles["hot-recommend"]}>
      <TopTitle title="热门推荐" tab={tabs} />
      <div className="recommend-list">
        {data.map((item) => {
          return <RecommendItem {...item} key={item.id} />;
        })}
      </div>
    </div>
  );
});

export default HotRecommend;
