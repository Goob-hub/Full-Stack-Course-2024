import React from "react";
import emojipedia from "../emojipedia";
import InfoEmoji from "./InfoEmoji";

function createEmojiInfo(props) {
  return (
    <InfoEmoji emoji={props.emoji} name={props.name} meaning={props.meaning} />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">{emojipedia.map(createEmojiInfo)}</dl>
    </div>
  );
}

export default App;
