import type { rankingInfoType } from "@/service/api/recommend";
import classNames from "classnames";
import React, { memo } from "react";
import { useAppDispatch } from "@/store";
import { fetchCurrSongAction } from "@/store/module/player";
import styles from "./style.less";

type RankingSongsListProps = {
  data: rankingInfoType;
  onCoverImgClick?: (data: rankingInfoType) => void;
};

const RankingSongsList: React.FC<RankingSongsListProps> = memo(
  ({ data, onCoverImgClick }) => {
    const dispatch = useAppDispatch();

    const handlePlay = (id?: number) => {
      if (!id) return;
      console.log("点击了播放", id);
      dispatch(fetchCurrSongAction(id));
    };

    return (
      <div className={styles["ranking-item"]}>
        <div className="ranking-item-top">
          <div
            className="img"
            onClick={() => onCoverImgClick && onCoverImgClick(data)}
          >
            <img src={data.playlist?.coverImgUrl} alt="" />
            <div className="sprite_cover cover"></div>
          </div>
          <div className="ranking-name">
            <span className="text">{data.playlist?.name}</span>
            <div className="opt">
              <span className="sprite_02 opt-item play"></span>
              <span className="sprite_02 opt-item file"></span>
            </div>
          </div>
        </div>
        <div className="ranking-item-list">
          {data.playlist?.tracks
            ?.slice(0, 10)
            .map((item, index) => {
              return (
                <div key={item?.id} className="list-item">
                  <div className="list-item-left">
                    <div className={classNames({ hot: index < 3 })}>
                      {index + 1}
                    </div>
                    <div className="one-line">{item?.name}</div>
                  </div>
                  <div className="list-item-right">
                    <div
                      className="play sprite_02"
                      title="播放"
                      onClick={() => handlePlay(item?.id)}
                    ></div>
                    <div
                      className="add sprite_icon2"
                      title="添加到播放列表"
                    ></div>
                    <div className="collect sprite_02" title="收藏"></div>
                  </div>
                </div>
              );
            })
            .concat(
              <div className="more" key="more">
                查看更多&gt;
              </div>
            )}
        </div>
      </div>
    );
  }
);

export default RankingSongsList;
