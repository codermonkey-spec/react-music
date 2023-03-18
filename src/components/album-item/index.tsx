import type { newAlbumItemType } from "@/service/api/recommend";

import React, { memo } from "react";
import classNames from "classnames";

import styles from "./style.less";

const AlbumItem: React.FC<newAlbumItemType> = memo(
  ({ picUrl, name, artists }) => {
    return (
      <div className={classNames(styles["album-item"], "sprite_cover")}>
        <div className="coverImg">
          <img src={picUrl} alt="" />
          <div className="sprite_cover album-img"></div>
        </div>
        <div className="album-name one-line">
          <span>{name}</span>
        </div>
        <div className="artist-name">{artists[0].name}</div>
      </div>
    );
  }
);

export default AlbumItem;
