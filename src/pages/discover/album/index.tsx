import type { TupleToUnion } from "@/types";
import type { newAlbumItemType } from "@/service/api/album";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Pagination, PaginationProps } from "antd";
import { getAllNewAlbum, getNewAlbum } from "@/service/api/album";
import styles from "./style.less";

import TopTitle from "@/components/top-title";
import AlbumItem from "@/components/album-item";
import ListLineItem from "@/components/list-line-item";

type allNewAlbumListProps = {
  total?: number;
  albums?: newAlbumItemType[];
};

type areaType = TupleToUnion<["全部", "华语", "欧美", "韩国", "日本"]>;
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
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn sprite_button2 prev-page"
          >
            上一页
          </button>
        );
      }
      if (type === "next") {
        return (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn sprite_button2 next-page"
          >
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
          icon={false}
        />
        <div className="album-list">
          {newAlbumList.slice(0, 10).map((item) => {
            return <AlbumItem key={item.name} size="large" {...item} />;
          })}
        </div>
        <TopTitle
          title={<h3 className="album-title">全部新碟</h3>}
          renderTab={() => (
            <ListLineItem data={tabs} onItemClick={onTabItemClick} />
          )}
          icon={false}
        />
        <div className="album-list">
          {allNewAlbumList.albums?.map((item) => {
            return item?.picUrl && <AlbumItem size="large" {...item} />;
          })}
        </div>

        <div className="footer-pagination">
          <Pagination
            current={currentPage}
            total={allNewAlbumList.total}
            onChange={(page) => setCurrentPage(page)}
            hideOnSinglePage
            showSizeChanger={false}
            itemRender={itemRender}
          />
        </div>
      </div>
    </div>
  );
});

export default Album;
