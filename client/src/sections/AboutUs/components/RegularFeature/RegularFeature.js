import React, { memo } from "react";
import "./RegularFeature.scss";
import Image from "../../../../components/Image/Image";

const RegularFeature = (props) => {
  const { className, title, imgPath } = props;
  return (
    <div className={className}>
      <Image
        data-testid="regularFeature-img"
        src={imgPath}
        alt="feature-icon"
      />
      <p data-testid="regularFeature-title">{title}</p>
    </div>
  );
};

export default memo(RegularFeature);
