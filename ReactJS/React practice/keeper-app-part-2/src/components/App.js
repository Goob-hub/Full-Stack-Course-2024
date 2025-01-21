import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function createNote(props) {
  return <Note key={props.key} title={props.title} content={props.content} />;
}

function App() {
  return (
    <div>
      <Header />
      {notes.map(createNote)}
      <Footer />
    </div>
  );
}

export default App;
