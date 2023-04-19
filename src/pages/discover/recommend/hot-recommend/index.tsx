import { hotRecommendItem } from "@/service/api/recommend";
import { useNavigate } from "react-router-dom";
import React, { memo, useCallback } from "react";
import styles from "./style.less";

import TopTitle from "@/components/top-title";
import RecommendItem from "@/components/recommend-item";
import ListLineItem from "@/components/list-line-item";
import More from "@/components/more";
import MoreArrow from "@/base-ui/more-arrow";

const tabs = ["华语", "流行", "摇滚", "民谣", "电子"];

type hotRecommendListType = {
  data: Partial<hotRecommendItem>[];
};

const HotRecommend: React.FC<hotRecommendListType> = memo(({ data }) => {
  const navigate = useNavigate();

  const onItemClick = useCallback((item: string) => {
    navigate(`/discover/playlist?cat=${item}`);
  }, []);

  const handleMore = useCallback(() => {
    navigate(`/discover/playlist`);
  }, []);

  return (
    <div className={styles["hot-recommend"]}>
      {data.length > 0 && (
        <TopTitle
          title="热门推荐"
          renderTab={() => (
            <ListLineItem data={tabs} onItemClick={onItemClick} />
          )}
          renderMore={() => (
            <More renderMoreIcon={<MoreArrow />} onClick={handleMore} />
          )}
        />
      )}
      <div className="recommend-list">
        {data.map((item) => {
          return <RecommendItem {...item} key={item.id} />;
        })}
      </div>
    </div>
  );
});

export default HotRecommend;
