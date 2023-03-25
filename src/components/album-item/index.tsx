import type { newAlbumItemType } from "@/service/api/album";

import React, { memo } from "react";
import classNames from "classnames";
import {
  normalItemContainerStyle,
  largeImgStyle,
  largeItemContainerStyle,
  normalImgStyle,
} from "./size";

import styles from "./style.less";

type albumItemProps = newAlbumItemType & {
  size?: "normal" | "large";
};

const AlbumItem: React.FC<albumItemProps> = memo(
  ({
    picUrl,
    name,
    artists,
    size = "normal",
    // playIconPosition = "-2px -205px",
  }) => {
    const itemContainerStyle =
      size === "normal" ? normalItemContainerStyle : largeItemContainerStyle;
    const imgStyle = size === "normal" ? normalImgStyle : largeImgStyle;

    return (
      <div
        className={classNames(styles["album-item"], "sprite_cover")}
        style={{
          ...itemContainerStyle,
        }}
      >
        <div
          className="coverImg"
          style={{
            ...imgStyle,
            backgroundPosition: itemContainerStyle.backgroundPosition,
          }}
        >
          <img src={picUrl} alt="" />
          <div
            className="sprite_cover album-img"
            style={{ backgroundPosition: imgStyle?.backgroundPosition }}
          ></div>
          <div className="sprite_playbar play-icon"></div>
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
