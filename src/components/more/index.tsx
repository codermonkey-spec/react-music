import React, { memo } from "react";

import styles from "./style.less";

const More: React.FC<{
  renderMoreIcon: React.ReactNode | (() => React.ReactNode);
  onClick?: () => void;
}> = memo(({ renderMoreIcon, onClick }) => {
  return (
    <div className={styles.more} onClick={onClick}>
      <div className="more-text">更多</div>
      {typeof renderMoreIcon === "function" ? renderMoreIcon() : renderMoreIcon}
    </div>
  );
});

export default More;
