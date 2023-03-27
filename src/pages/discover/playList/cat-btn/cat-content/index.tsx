import type { catInfoType } from "@/service/api/play-list";
import classNames from "classnames";

import React, { memo, useMemo } from "react";

import styles from "./style.less";

const CatContent: React.FC<{
  catInfo: catInfoType | null;
  setOpen: React.Dispatch<boolean>;
  setCat: React.Dispatch<string>;
  cat: string;
}> = memo(({ catInfo = null, setOpen, setCat, cat }) => {
  const catList = useMemo(() => {
    const result: { [key: string]: catInfoType["sub"][number][] } = {};

    if (catInfo) {
      for (let value of Object.keys(catInfo?.categories)) {
        result[value] = [];
      }
    }

    catInfo?.sub.forEach((item) => {
      result[item.category].push(item);
    });

    return result;
  }, [catInfo]);

  const handleCatItemClick = (name: string) => {
    setCat(name);
    setOpen(false);
  };

  return (
    <div className={styles["cat-info"]}>
      <div className="cat-info-left">
        {catInfo?.categories &&
          Object.entries(catInfo.categories).map(([key, value]) => {
            return (
              <div key={key} className="cat-list-item">
                <span>{value}</span>
              </div>
            );
          })}
      </div>
      <div className="cat-info-right">
        {Object.values(catList).map((item, index) => {
          return (
            <div key={item[index].name} className="cat-list">
              {item.map((child: catInfoType["sub"][number]) => {
                return (
                  <span
                    key={child.name}
                    className="cat-item"
                    onClick={() => handleCatItemClick(child.name)}
                  >
                    <span
                      className={classNames(
                        "text",
                        cat === child.name && "active"
                      )}
                    >
                      {child.name}
                    </span>
                    <span className="line">|</span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CatContent;
