import React, { memo, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { shallowEqual } from "react-redux";
import { animated, useSpring } from "@react-spring/web";
import { useAppDispatch, useAppSelector } from "@/store";
import { Slider, message, Tooltip } from "antd";
import {
  updateInitialState,
  changePlaySongAction,
} from "@/store/module/player";
import { getPlayerUrl, formatTime } from "@/utils/handle-player";
import { playModeInfo } from "./constants";
import styles from "./style.less";

import LyricsBar from "./lyrics-bar";

const Player = memo(() => {
  const dispatch = useAppDispatch();
  const {
    currentSong,
    currentLyricsIndex,
    currentLyrics,
    playMode,
    playSongsList,
  } = useAppSelector((state) => state.player, shallowEqual);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [lyricsBarVis, setLyricsBarVis] = useState(false);

  const [springs, api] = useSpring(() => ({
    from: {
      height: "0px",
      opacity: 0,
    },
  }));

  useEffect(() => {
    if (!audioRef.current) return;
    if (currentSong?.id) {
      audioRef.current.src = getPlayerUrl(currentSong.id);
    }

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        setIsPlaying(false);
      });

    if (currentSong?.dt) {
      setDuration(currentSong.dt);
    }
  }, [currentSong]);

  const onSliderChange = (value: number) => {
    const currentTime = (value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime / 1000;
    }

    setSliderValue(value);
    setCurrTime(currentTime);
  };

  const handleTimeUpdate = () => {
    // 秒
    const currentTime = (audioRef.current?.currentTime || 0) * 1000;
    if (audioRef.current) {
      setCurrTime(currentTime);
      setSliderValue((currentTime / duration) * 100);
    }

    // 更新歌词

    let index = currentLyrics.findIndex((item) => item.time > currentTime);
    if (index < 0) {
      index = currentLyrics.length - 1;
    }

    // 当我们的歌词索引改变了再去更新
    if (currentLyricsIndex === index - 1 || index === -1) return;

    dispatch(
      updateInitialState({ label: "currentLyricsIndex", value: index - 1 })
    );

    if (currentLyrics[index - 1]?.text && !lyricsBarVis) {
      message.open({
        content: currentLyrics[index - 1]?.text || "",
        key: "lyrics",
        duration: 0,
      });
    } else {
      message.destroy("lyrics");
    }
  };

  const handlePlayEnded = () => {
    dispatch(changePlaySongAction(true));
  };

  const handlePlayOrPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }

    setIsPlaying((prevState) => !prevState);
  };

  const handleNextSong = (opt: "prev" | "next") => {
    dispatch(changePlaySongAction(opt === "next" ? true : false));
  };

  const handleChangePlayMode = () => {
    dispatch(
      updateInitialState({
        label: "playMode",
        value: (playMode + 1) % 3,
      })
    );
  };

  const handleLyricBar = () => {
    api.start({
      height: lyricsBarVis ? "0px" : "301px",
      opacity: lyricsBarVis ? 0 : 1,
    });
    setLyricsBarVis(!lyricsBarVis);
  };

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  return (
    <div className={classNames("sprite_playbar", styles["player-bar"])}>
      <div className="content wrap-v2">
        <div className="player-control">
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleNextSong("prev")}
          ></button>
          <button
            className="btn sprite_playbar play"
            style={{
              backgroundPosition: `${isPlaying ? "0 -165px" : "0 -204px"} `,
            }}
            onClick={handlePlayOrPause}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleNextSong("next")}
          ></button>
        </div>
        <div className="player-info">
          <NavLink to="/discover/player">
            <img src={currentSong?.al?.picUrl} alt="" className="image" />
          </NavLink>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name || ""}</span>
              <span className="singer-name">
                {(currentSong?.ar && currentSong?.ar[0]?.name) || ""}
              </span>
            </div>
            <div className="progress">
              <Slider
                step={0.5}
                value={sliderValue}
                onChange={onSliderChange}
                tooltip={{ formatter: null }}
              />
              <div className="time">
                <span className="current">{formatTime(currTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bar-opterator">
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <Tooltip
              trigger="click"
              title={
                <Slider
                  value={(audioRef.current?.volume || 0) * 100}
                  onChange={handleVolumeChange}
                  vertical
                  className={classNames("sprite_playbar", styles["volume-bar"])}
                />
              }
            >
              <button className="btn sprite_playbar volume"></button>
            </Tooltip>
            <Tooltip placement="top" title={playModeInfo[playMode].text}>
              <button
                className="btn sprite_playbar loop"
                style={{
                  backgroundPosition: playModeInfo[playMode].position,
                }}
                onClick={handleChangePlayMode}
              ></button>
            </Tooltip>
            <button
              className="btn sprite_playbar playlist"
              onClick={handleLyricBar}
            >
              {playSongsList.length}
            </button>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handlePlayEnded}
      />
      <animated.div style={{ ...springs }} className="lyric-wrap">
        <LyricsBar api={api} setLyricsBarVis={setLyricsBarVis} />
      </animated.div>
    </div>
  );
});

export default Player;
