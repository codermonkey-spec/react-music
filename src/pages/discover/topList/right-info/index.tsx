import type { topListItem, trackAllType } from "@/service/api/top-list";
import React, { memo, useEffect, useState } from "react";
import moment from "moment";
import {
  useSpring,
  animated,
  useTransition,
  useSpringRef,
  useChain,
} from "@react-spring/web";
import { useAppDispatch } from "@/store";
import { getTrackAll } from "@/service/api/top-list";
import { formatTime } from "@/utils/handle-player";
import { fetchCurrSongAction } from "@/store/module/player";
import styles from "./style.less";

import TopTitle from "@/components/top-title";

const RightInfo: React.FC<{
  data?: topListItem;
}> = memo(({ data }) => {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<trackAllType["songs"]>([]);

  const infoRef = useSpringRef();
  const springs = useSpring({
    ref: infoRef,
    from: {
      transform: "scale(0)",
    },
    to: {
      transform: "translateX(1)",
    },
    reset: true,
  });
  const springRef = useSpringRef();

  const [transitions] = useTransition(tracks, () => ({
    ref: springRef,
    keys: null,
    trail: 2000 / tracks.length,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
  }));

  useChain([infoRef, springRef]);

  useEffect(() => {
    if (data?.id) {
      getTrackAll(data.id).then((res) => {
        const newSons = res.songs.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        setTracks(newSons);
      });
    }
  }, [data?.id]);

  const handlePlay = (id: number) => {
    dispatch(fetchCurrSongAction(id));
  };

  return (
    <div className={styles["right-info"]}>
      {
        tracks.length > 0 && (
          <animated.div style={{ ...springs }}>
            <div className="info-top">
              <div className="info-img">
                <img src={data?.coverImgUrl} alt="" />
              </div>
              <div className="ranking-info">
                <div className="ranking-name">{data?.name}</div>
                <div className="ranking-time">
                  <span className="sprite_icon2 timeIcon"></span>
                  <span>最近更新：</span>
                  <span>{moment(data?.updateTime).format("MM月DD日")}</span>
                  <span className="update-text">（{data?.updateFrequency}）</span>
                </div>
                <div className="ranking-opt">
                  {/* <span className="sprite_button play">播放</span> */}
                  <span className="sprite_button collection"></span>
                  <span className="sprite_button share"></span>
                  <span className="sprite_button download"></span>
                  <span className="sprite_button comment"></span>
                </div>
              </div>
            </div>
          </animated.div>
        )
      }
      {
        tracks.length > 0 && (
          <div className="info-content">
            <TopTitle
              icon={false}
              title="歌曲列表"
              renderTab={() => (
                <div className="songs-num">{tracks?.length}首歌</div>
              )}
              renderMore={() => (
                <span>
                  播放: <span className="playCount">{data?.playCount}</span> 次
                </span>
              )}
            />
            <div className="track-songs">
              <table>
                <thead>
                  <tr>
                    <th className="first"></th>
                    <th>
                      <div>标题</div>
                    </th>
                    <th>
                      <div>时长</div>
                    </th>
                    <th>
                      <div>歌手</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transitions((style, item) => (
                    <animated.tr style={style} key={item.id} className="row">
                      <td className="index">{item.index}</td>
                      <td>
                        <span
                          className="sprite_table table-play"
                          onClick={() => handlePlay(item.id)}
                        ></span>
                        <span className="one-line table-name">{item.name}</span>
                      </td>
                      <td>{formatTime(item.dt)}</td>
                      <td>{item.ar[0].name}</td>
                    </animated.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    </div>
  );
});

export default RightInfo;
