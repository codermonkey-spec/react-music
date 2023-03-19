import type { newAlbumItemType } from "@/service/api/album";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Pagination, PaginationProps } from "antd";
import { getAllNewAlbum, getNewAlbum } from "@/service/api/album";
import styles from "./style.less";

import TopTitle from "@/components/top-title";
import AlbumItem from "@/components/album-item";

type allNewAlbumListProps = {
  total?: number;
  albums?: newAlbumItemType[];
};

type areaType = "全部" | "华语" | "欧美" | "韩国" | "日本";

const itemContainerStyle = {
  width: 153,
  height: 140,
  backgroundPosition: "0 -845px",
};

const imgStyle = {
  width: 130,
  height: 130,
  backgroundPosition: "0 -146px",
};

const tabs = ["全部", "华语", "欧美", "韩国", "日本"];
const defaultPageSize = 35;

const Album = memo(() => {
  const [newAlbumList, setNewAlbumList] = useState<newAlbumItemType[]>([]);
  const [allNewAlbumList, setAllNewAlbumList] = useState<allNewAlbumListProps>(
    {}
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [area, setArea] = useState("KR");

  const itemRender: PaginationProps["itemRender"] = useMemo(
    () => (_, type, originalElement) => {
      if (type === "prev") {
        return (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            上一页
          </button>
        );
      }
      if (type === "next") {
        return (
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            下一页
          </button>
        );
      }
      return originalElement;
    },
    [currentPage]
  );

  useEffect(() => {
    getNewAlbum().then((res) => {
      setNewAlbumList(res.albums);
    });
  }, []);

  useEffect(() => {
    getAllNewAlbum(
      area,
      defaultPageSize,
      defaultPageSize * (currentPage - 1)
    ).then((res) => {
      setAllNewAlbumList(res);
    });
  }, [currentPage, area]);

  const onTabItemClick = useCallback((item: areaType) => {
    const areaMap = {
      全部: "ALL",
      华语: "ZH",
      欧美: "EA",
      韩国: "KR",
      日本: "JP",
    } as const;
    const newArea = areaMap[item] || "ALL";
    setArea(newArea);
  }, []);

  return (
    <div className={styles.album}>
      <div className="wrap-v2 album-content">
        <TopTitle
          title={<h3 className="album-title">热门新碟</h3>}
          isMore={false}
          icon={false}
        />
        <div className="album-list">
          {newAlbumList.slice(0, 10).map((item) => {
            return (
              <AlbumItem
                key={item.name}
                {...item}
                itemContainerStyle={itemContainerStyle}
                imgStyle={imgStyle}
              />
            );
          })}
        </div>
        <TopTitle
          title={<h3 className="album-title">全部新碟</h3>}
          tab={tabs}
          onTabItemClick={onTabItemClick}
          isMore={false}
          icon={false}
        />
        <div className="album-list">
          {allNewAlbumList.albums?.map((item) => {
            return (
              <AlbumItem
                key={item.name}
                {...item}
                itemContainerStyle={itemContainerStyle}
                imgStyle={imgStyle}
              />
            );
          })}
        </div>

        <div className="footer-pagination">
          <Pagination
            current={currentPage}
            total={allNewAlbumList.total}
            onChange={(page) => setCurrentPage(page)}
            hideOnSinglePage
            showSizeChanger={false}
            pageSizeOptions={[]}
            itemRender={itemRender}
          />
        </div>
      </div>
    </div>
  );
});

export default Album;
