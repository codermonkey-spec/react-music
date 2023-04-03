import React, { memo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatTime } from "@/utils/handle-player";
import styles from "./style.less";

const LyricsBar = memo(() => {
  const { playSongsList } = useAppSelector((state) => ({
    playSongsList: state.player.playSongsList,
  }));

  return (
    <div className={styles["lyrics-bar"]}>
      <div className="playlist_bg lyrics-bar-header"></div>
      <div className="playlist_bg lyrics-bar-content">
        <div className="content-left">
          {playSongsList.map((item) => {
            return (
              <div key={item?.id} className="song-item">
                <div className="arrow"></div>
                <div className="one-line song-name">{item?.name}</div>
                <div className="opt"></div>
                <div
                  className="singer-name one-line"
                  title={item?.ar && item?.ar[0].name}
                >
                  {item?.ar && item?.ar[0].name}
                </div>
                <div className="dt">{formatTime(item?.dt || 0)}</div>
              </div>
            );
          })}
        </div>
        <div className="content-right">歌词部分</div>
      </div>
    </div>
  );
});

export default LyricsBar;
