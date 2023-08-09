import React from 'react';
import "./styles/styles.css";

const info = () => {
    let friends = ["小明", "小華", "小張"];
  return (
    <div className='info'>
        <p>我的朋友是:</p>
        {friends.map((friend) => (
             <p>我朋友有{friend}</p>
            ))
        }

        </div>
  );
};

export default info;