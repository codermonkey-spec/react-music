import type {
  bannerListType,
  hotRecommendItem,
  newAlbumItemType,
  rankingInfoType,
} from "@/service/api/recommend";

import React, { memo, useEffect, useState } from "react";
import {
  getBanners,
  getHotRecommend,
  getNewAlbum,
  getRankingSongs,
  ranking_id,
} from "@/service/api/recommend";
import { hotRadios } from "@/assets/data/local-data";

import styles from "./style.less";
import TopSwiper from "./top-swiper";
import HotRecommend from "./hot-recommend";
import NewAlbum from "./new-album";
import Ranking from "./ranking";

const Recommend = memo(() => {
  const [banners, setBanners] = useState<bannerListType["banners"]>([]);
  const [hotRecommendList, setHotRecommendList] = useState<
    Partial<hotRecommendItem>[]
  >([]);
  const [newAlbumList, setNewAlbumList] = useState<newAlbumItemType[]>([]);

  /** 榜单 */
  const [topSongsList, setTopSongsList] = useState<rankingInfoType>({});
  const [newSongsList, setNewSongsList] = useState<rankingInfoType>({});
  const [originSongsList, setOriginSongsList] = useState<rankingInfoType>({});

  useEffect(() => {
    getBanners().then((res) => {
      setBanners(res.banners);
    });

    getHotRecommend().then((res) => {
      setHotRecommendList(res.result);
    });

    getNewAlbum().then((res) => {
      setNewAlbumList(res.albums);
    });
  }, []);

  useEffect(() => {
    const params = [
      getRankingSongs(),
      getRankingSongs(ranking_id.NEW),
      getRankingSongs(ranking_id.ORIGIN),
    ];
    Promise.all(params).then((res) => {
      const [topSongsData, newSongsData, originSongsData] = res;
      setTopSongsList(topSongsData);
      setNewSongsList(newSongsData);
      setOriginSongsList(originSongsData);
    });
  }, []);

  return (
    <div className={styles.recommend}>
      <TopSwiper data={banners} />
      <div className="wrap-v2 content">
        <div className="left">
          <HotRecommend data={hotRecommendList.slice(0, 8)} />
          <NewAlbum data={newAlbumList} />
          <Ranking
            topData={topSongsList}
            newData={newSongsList}
            originData={originSongsList}
          />
        </div>
        <div className="right">
          <div className="sprite_02 right-login">
            <div className="text">
              登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
            </div>
            <div className="sprite_02 user-login">用户登录</div>
          </div>
          <div className="hot-singers">
            <div className="hot-singers-title">
              <div>热门主播</div>
            </div>
            {hotRadios.map((item) => {
              return (
                <div key={item.name} className="hot-singer-item">
                  <div className="picUrl">
                    <img src={item.picUrl} alt="" />
                  </div>
                  <div className="info">
                    <div>{item.name}</div>
                    <div>{item.position}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Recommend;
