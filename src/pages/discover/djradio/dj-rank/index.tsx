import type {
  programTopListType,
  programRecommendType,
} from "@/service/api/djradio";
import React, { memo } from "react";

import styles from "./style.less";

import TopTitle from "@/components/top-title";

const DjRank: React.FC<{
  programTopList: programTopListType["toplist"] | [];
  programRecommend: programRecommendType["programs"];
}> = memo(({ programRecommend, programTopList = [] }) => {
  return (
    <div className={styles["dj-rank"]}>
      <div className="dj-recommend">
        <TopTitle
          icon={false}
          title="推荐节目"
          renderMore={<div>更多&gt;</div>}
        />
        {programRecommend.map((item) => {
          return (
            <div key={item.id} className="recommend-item">
              <div className="recommend-item-left">
                <div className="coverUrl">
                  <img src={item.coverUrl} alt="" />
                </div>
                <div className="text">
                  <div className="name">{item.name}</div>
                  <div className="radio-name">{item.radio.name}</div>
                </div>
              </div>
              <div className="type">明星专区</div>
            </div>
          );
        })}
      </div>
      <div className="dj-toplist">
        <TopTitle
          icon={false}
          title="节目排行榜"
          renderMore={<div>更多&gt;</div>}
        />
        {programTopList.map((item) => {
          return (
            <div key={item.program.id} className="toplist-item">
              <div className="item-left">
                <div className="coverUrl">
                  <img src={item.program.coverUrl} alt="" />
                </div>
                <div>
                  <div className="name">{item.program.name}</div>
                  <div className="program-radio-name">
                    {item.program.radio.name}
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default DjRank;
