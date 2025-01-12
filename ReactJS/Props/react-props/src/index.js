import React from "react";
import ReactDOM from "react-dom";

function Card(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.url} alt={props.alt} />
      <p>{props.phone}</p>
      <p>{props.email}</p>
    </div>
  );
}

ReactDOM.render(
  <div class="card-container">
    <h1>My Contacts</h1>
    <Card
      name="Beyonce"
      alt="avatar_img"
      phone="+123 456 789"
      email="b@beyonce.com"
      url="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg"
    />
    <Card
      name="Jack Bauer"
      alt="avatar_img"
      phone="+987 654 321"
      email="jack@nowhere.com"
      url="https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg"
    />
  </div>,
  document.getElementById("root")
);
