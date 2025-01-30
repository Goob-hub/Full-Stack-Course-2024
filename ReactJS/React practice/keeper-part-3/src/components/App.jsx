import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  let [noteList, editList] = useState([]);

  function addNote(note, editNote) {
    if (note.title.length === 0 || note.content.length === 0) return;
    editList([...noteList, note]);
    editNote({
      title: "",
      content: "",
    });
  }

  function deleteNote(id) {
    editList(() => {
      return noteList.filter((note, index) => {
        if (index !== id) return note;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {noteList.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            deleteNote={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
