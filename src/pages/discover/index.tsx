import React, { Suspense } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { discoverMenu } from "@/assets/data/local-data";
import styles from "./style.less";

export default function Discover() {
  return (
    <div className={styles.discover}>
      <div className="nav2">
        <div className="wrap-v1">
          <div className="nav2-wrap">
            {discoverMenu.map((item) => {
              return (
                <div key={item.link} className="nav-item">
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Suspense fallback="loading...">
        <Outlet />
      </Suspense>
    </div>
  );
}
