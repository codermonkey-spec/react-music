import type { SpringRef } from "@react-spring/web";
import React, { memo, useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateInitialState, fetchCurrSongAction } from "@/store/module/player";
import { formatTime } from "@/utils/handle-player";
import styles from "./style.less";

import EmptySong from "../empty-song";

const LyricsBar: React.FC<{
  api: SpringRef<{ height: string; opacity: number }>;
  setLyricsBarVis: React.Dispatch<boolean>;
}> = memo(({ api, setLyricsBarVis }) => {
  const dispatch = useAppDispatch();
  const { playSongsList, playSongIndex, currentLyrics, currentLyricsIndex } =
    useAppSelector(
      (state) => ({
        playSongsList: state.player.playSongsList,
        playSongIndex: state.player.playSongIndex,
        currentLyrics: state.player.currentLyrics,
        currentLyricsIndex: state.player.currentLyricsIndex,
      }),
      shallowEqual
    );

  const ref = useRef<HTMLDivElement | null>(null);
  const currScrollTop = useRef<number>(0);

  useEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      // currScrollTop.current += 32;
      // console.log("currentLyricsIndex", currentLyricsIndex);
      // if (ref.current.scrollTop > currScrollTop.current) {
      //   ref.current.scrollTop = currScrollTop.current - 32 * 5;
      //   return;
      // }
      // if (currScrollTop.current > height / 2) {
      //   ref.current.scrollTop += 32;
      // }
      ref.current.scrollTop = 32 * currentLyricsIndex - height / 2;
    }
  }, [currentLyricsIndex]);

  const handleClick = () => {
    api.start({
      height: "0px",
      opacity: 0,
    });
    setLyricsBarVis(false);
  };

  const handleClear = () => {
    dispatch(
      updateInitialState({
        label: "playSongsList",
        value: [],
      })
    );

    dispatch(
      updateInitialState({
        label: "playSongIndex",
        value: -1,
      })
    );
  };

  const handleDeleteItem = (index: number) => {
    dispatch(
      updateInitialState({
        label: "playSongsList",
        value: playSongsList.filter((_, idx) => idx !== index),
      })
    );
  };

  const handlePlayItem = (id?: number) => {
    if (!id) return;

    dispatch(
      updateInitialState({
        label: "playSongIndex",
        value: playSongsList.findIndex((item) => item?.id === id),
      })
    );
    dispatch(
      updateInitialState({
        label: "currentLyricsIndex",
        value: 0,
      })
    );
    dispatch(fetchCurrSongAction(id));
    if (ref.current) {
      ref.current.scrollTop = 0;
      currScrollTop.current = 0;
    }
  };

  return (
    <div className={styles["lyrics-bar"]}>
      <div className="playlist_bg lyrics-bar-header">
        <div className="header-left">
          <div>播放列表({playSongsList.length})</div>
          <div className="header-opt">
            <div className="addall">
              <span className="sprite_playlist icon-addall"></span>
              <span>收藏全部</span>
            </div>
            <div className="clear" onClick={handleClear}>
              <span className="sprite_playlist icon-clearall"></span>
              <span>清除</span>
            </div>
          </div>
        </div>
        <div className="close" onClick={handleClick}>
          &#215;
        </div>
      </div>
      <div className="playlist_bg lyrics-bar-content">
        <div className="content-left">
          {playSongsList.length > 0 ? (
            playSongsList.map((item, index) => {
              return (
                <div
                  key={Math.random() * (item?.id || 0)}
                  className="song-item"
                  onClick={() => handlePlayItem(item?.id)}
                >
                  <div
                    className={classNames(
                      "sprite_playlist arrow",
                      index === playSongIndex && "active"
                    )}
                  ></div>
                  <div className="one-line song-name">{item?.name}</div>
                  <div className="opt">
                    <span className="sprite_playlist icon-add"></span>
                    <span className="sprite_playlist icon-share"></span>
                    <span className="sprite_playlist icon-download"></span>
                    <span
                      className="sprite_playlist icon-del"
                      onClick={() => handleDeleteItem(index)}
                    ></span>
                  </div>
                  <div
                    className="singer-name one-line"
                    title={item?.ar && item?.ar[0].name}
                  >
                    {item?.ar && item?.ar[0].name}
                  </div>
                  <div className="dt">{formatTime(item?.dt || 0)}</div>
                </div>
              );
            })
          ) : (
            <EmptySong />
          )}
        </div>
        <div className="content-right" ref={ref}>
          <div>
            {currentLyrics.map((item, index) => {
              return (
                <div
                  key={item.time}
                  className={classNames(
                    "lyric-item",
                    currentLyricsIndex === index && "active"
                  )}
                >
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default LyricsBar;
