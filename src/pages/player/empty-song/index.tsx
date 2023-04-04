import React, { memo } from "react";

import styles from "./style.less";

const EmptySong = memo(() => {
  return (
    <div className={styles["empty-song"]}>
      <div>
        <div>
          <span className="sprite_playlist icon-face"></span>
          <span>你还没有添加任何歌曲</span>
        </div>
        <div className="text">
          去首页发现音乐，或在我的音乐收听自己收藏的歌单。
        </div>
      </div>
    </div>
  );
});

export default EmptySong;
