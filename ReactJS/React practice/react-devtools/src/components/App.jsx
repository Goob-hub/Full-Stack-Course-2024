import React from "react";
import Card from "./Card";
import contacts from "../contacts";
import Avatar from "../components/Avatar";

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>

      <Avatar img="https://i.dailymail.co.uk/1s/2019/10/23/09/20074134-0-image-a-9_1571819406170.jpg" />

      <Card
        name={contacts[0].name}
        img={contacts[0].imgURL}
        tel={contacts[0].phone}
        email={contacts[0].email}
      />
      <Card
        name={contacts[1].name}
        img={contacts[1].imgURL}
        tel={contacts[1].phone}
        email={contacts[1].email}
      />
      <Card
        name={contacts[2].name}
        img={contacts[2].imgURL}
        tel={contacts[2].phone}
        email={contacts[2].email}
      />
    </div>
  );
}

export default App;
