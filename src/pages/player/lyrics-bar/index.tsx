import React, { memo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "./style.less";

const LyricsBar = memo(() => {
  const { playSongsList } = useAppSelector((state) => ({
    playSongsList: state.player.playSongsList,
  }));

  return (
    <div className={styles["lyrics-bar"]}>
      <div className="playlist_bg lyrics-bar-header"></div>
      <div className="playlist_bg lyrics-bar-content">
        {playSongsList.map((item) => {
          return <div key={item?.id}>{item?.name}</div>;
        })}
      </div>
    </div>
  );
});

export default LyricsBar;
