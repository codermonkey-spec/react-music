import type { topListItem } from "@/service/api/top-list";
import { ranking_id } from "@/service/api/recommend";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "qs";
import { getTopList } from "@/service/api/top-list";
import styles from "./style.less";

import TopListItem from "./top-list-item";
import RightInfo from "./right-info";

const TopList = memo(() => {
  const { search } = useLocation();
  const [topList, setTopList] = useState<topListItem[]>([]);
  const [currId, setCurId] = useState(
    Number(parse(search.slice(1))?.id) || ranking_id.TOP
  );

  const infoItem = useMemo(() => {
    return topList.find((item) => item.id === currId);
  }, [currId, topList]);

  useEffect(() => {
    getTopList().then((res) => {
      setTopList(res.list);
    });
  }, []);

  const handleClick = useCallback((id: number) => {
    setCurId(id);
  }, []);

  return (
    <div className={styles["top-list"]}>
      <div className="wrap-v2 top-list-content">
        <div className="list-left">
          <div className="title">云音乐特色榜</div>
          <div>
            {topList.slice(0, 5).map((item) => {
              return (
                <TopListItem
                  key={item.id}
                  {...item}
                  currId={currId}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
          <div className="title">全球媒体榜</div>
          <div>
            {topList.slice(5).map((item) => {
              return (
                <TopListItem
                  key={item.id}
                  {...item}
                  currId={currId}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
        </div>
        <div className="list-right">
          <RightInfo data={infoItem} />
        </div>
      </div>
    </div>
  );
});

export default TopList;
