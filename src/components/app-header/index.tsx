import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { headerLinks } from "@/assets/data/local-data";

import styles from "./style.less";

const AppHeader = memo(() => {
  const renderHeader = () => {
    return headerLinks.map((item) => {
      if (item.link.startsWith("/")) {
        return (
          <NavLink to={item.link} key={item.link}>
            <span>{item.title}</span>
            <span className="sprite_01 bottom-arrow"></span>
          </NavLink>
        );
      } else {
        return (
          <a href={item.link} key={item.link}>
            <span>{item.title}</span>
            <span className="sprite_01 hot"></span>
          </a>
        );
      }
    });
  };

  return (
    <div className={styles["app-header"]}>
      <div className="wrap-v1 header-wrap">
        <div className="left">
          <div className="sprite_01 logo"></div>
          <div className="nav">{renderHeader()}</div>
        </div>
        <div className="right">
          <Input
            prefix={<SearchOutlined />}
            placeholder="音乐/视频/电台/用户"
            className="search"
            addonAfter={null}
          />
          <div className="center">创作者中心</div>
          <div className="login">登录</div>
        </div>
      </div>
    </div>
  );
});

export default AppHeader;
