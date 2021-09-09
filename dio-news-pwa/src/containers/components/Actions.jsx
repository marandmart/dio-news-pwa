import React, { memo } from "react";
import ShareIcon from "../../images/share.svg";
import CopyIcon from "../../images/copy.svg";

const navigatorShare = navigator.share;
const URL = "http://localhost:3001";

function Actions({ post, subject }) {
  const { id, title } = post;

  const shareInfo = () => {
    navigator.share({ title: `PWA News - ${subject}`, text: title, url: URL });
  };
  const copyInfo = () => {
    navigator.clipboard.write(
      `${title} - *Learn more about it in ${URL}/${subject}/${id}*`
    );
  };

  const renderActions = () => {
    const action = navigatorShare ? shareInfo : copyInfo;

    const icon = navigatorShare ? ShareIcon : CopyIcon;

    return (
      <img alt="icon" src={icon} className="share-icon" onClick={action} />
    );
  };

  return <div className="share">{renderActions()}</div>;
}

export default memo(Actions);
