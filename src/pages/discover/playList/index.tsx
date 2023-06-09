import type { playListType } from "@/service/api/play-list";
import { memo, useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { useLocation } from "react-router-dom";
import { parse } from "qs";
import { getPlayList } from "@/service/api/play-list";
import styles from "./style.less";

import TopTitle from "@/components/top-title";
import CatBtn from "./cat-btn";
import RecommendItem from "@/components/recommend-item";

const pageSize = 35;
const defaultCategory = "hot";

const PlayList = memo(() => {
  const { search } = useLocation();
  const [cat, setCat] = useState(
    (parse(search.slice(1))?.cat as string) || "全部"
  );

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
    getPlayList(pageSize, defaultCategory, cat).then((res) => {
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
        {
          dataSource.length > 0 && (
            <TopTitle
              title={cat}
              icon={false}
              renderTab={() => <CatBtn setCat={setCat} cat={cat} />}
              renderMore={<div>热门</div>}
            />
          )
        }
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

