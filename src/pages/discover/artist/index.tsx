import React, { memo } from "react";
import classNames from "classnames";
import { artistCategories } from "@/assets/data/local-data";
import styles from "./style.less";

import RightSingers from "./right-singers";

const Artist = memo(() => {
  return (
    <div className={styles.artist}>
      <div className="wrap-v2 artist-content">
        <div className="artist-left">
          <div className="wrap">
            {artistCategories.map((item, itemIndex) => {
              return (
                <div key={item.title} className="artist-item">
                  <div className="title">{item.title}</div>
                  {item.artists.map((child, index) => {
                    return (
                      <div key={child.name} className="artist-name">
                        <span
                          className={classNames(
                            "dot",
                            itemIndex === 0 && index === 0 && "active"
                          )}
                        ></span>
                        <span>{child.name}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="artist-right">
          <RightSingers />
        </div>
      </div>
    </div>
  );
});

export default Artist;
