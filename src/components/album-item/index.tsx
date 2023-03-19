import type { newAlbumItemType } from "@/service/api/album";

import React, { memo } from "react";
import classNames from "classnames";

import styles from "./style.less";

type albumItemProps = newAlbumItemType & {
  itemContainerStyle?: {
    [key in keyof React.CSSProperties]: any;
  };
  imgStyle?: {
    [key in keyof React.CSSProperties]: any;
  };
};

const defaultItemContainerStyle = {
  width: 118,
  height: 100,
  backgroundPosition: "0 -570px",
};

const defaultImgStyle = {
  width: 100,
  height: 100,
  backgroundPosition: "-1px -146px",
};

const AlbumItem: React.FC<albumItemProps> = memo(
  ({
    picUrl,
    name,
    artists,
    itemContainerStyle = defaultItemContainerStyle,
    imgStyle = defaultImgStyle,
  }) => {
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
            backgroundPosition: defaultItemContainerStyle.backgroundPosition,
          }}
        >
          <img src={picUrl} alt="" />
          <div
            className="sprite_cover album-img"
            style={{ backgroundPosition: imgStyle?.backgroundPosition }}
          ></div>
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
