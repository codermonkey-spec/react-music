import type { hotRecommendItem } from "@/service/api/recommend";

import React, { memo } from "react";
import { formatPlayCount } from "@/utils";

import styles from "./style.less";

const RecommendItem: React.FC<Partial<hotRecommendItem>> = memo(
  ({ name, picUrl, playCount }) => {
    return (
      <div className={styles["recommend-item"]}>
        <div className="img">
          <img src={picUrl} alt="" />
          <div className="sprite_cover cover"></div>
          {playCount && (
            <div className="sprite_cover play-count">
              <span className="sprite_icon earphone"></span>
              <span className="num">{formatPlayCount(playCount || 0)}</span>
              <span className="sprite_icon play"></span>
            </div>
          )}
        </div>
        <div className="text">{name}</div>
      </div>
    );
  }
);

export default RecommendItem;
