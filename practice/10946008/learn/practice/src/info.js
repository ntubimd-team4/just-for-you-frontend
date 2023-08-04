import React from "react";
import "./styles/style.css";

const info = () => {
  let friends = ["小明", "小華", "小張"];

  return (
    <div className="info">
      <p>我的朋友們是：</p>
      {/* [<p>"小明"</p>,<p>"小華"</p>,<p>"小張"</p>] */}
      {friends.map((friend) => (
        <p>我的朋友有{friend}</p>
      ))}
    </div>
  );
};

export default info;
