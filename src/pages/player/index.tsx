import React, { memo, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store";
import { Slider } from "antd";
import { getPlayerUrl, formatTime } from "@/utils/handle-player";
import styles from "./style.less";

const Player = memo(() => {
  const { currentSong } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
    }),
    shallowEqual
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

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

  const handleTimeUpdate = () => {
    // 秒
    const currentTime = audioRef.current?.currentTime || 0;
    if (audioRef.current) {
      setCurrTime(currentTime * 1000);
      setSliderValue(((currentTime * 1000) / duration) * 100);
    }
  };

  const handlePlayEnded = () => {};

  const handlePlayOrPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }

    setIsPlaying((prevState) => !prevState);
  };

  const onSliderChange = (value: number) => {
    const currentTime = (value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime / 1000;
    }

    setSliderValue(value);
    setCurrTime(currentTime);
  };

  return (
    <div>
      <div className={classNames("sprite_playbar", styles["player-bar"])}>
        <div className="content wrap-v2">
          <div className="player-control">
            <button className="btn sprite_playbar prev"></button>
            <button
              className="btn sprite_playbar play"
              style={{
                backgroundPosition: `${isPlaying ? "0 -165px" : "0 -204px"} `,
              }}
              onClick={handlePlayOrPause}
            ></button>
            <button className="btn sprite_playbar next"></button>
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
              <button className="btn sprite_playbar volume"></button>
              <button className="btn sprite_playbar loop"></button>
              <button className="btn sprite_playbar playlist"></button>
            </div>
          </div>
        </div>
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handlePlayEnded}
        />
      </div>
    </div>
  );
});

export default Player;
