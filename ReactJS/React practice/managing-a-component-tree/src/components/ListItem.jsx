import React from "react";

function ListItem(props) {
  return (
    <li
      onClick={() => {
        props.onClick(props.id);
      }}
    >
      {props.item}
    </li>
  );
}

export default ListItem;
