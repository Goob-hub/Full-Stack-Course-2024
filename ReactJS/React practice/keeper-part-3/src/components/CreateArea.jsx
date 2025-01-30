import React, { useState } from "react";

function CreateArea(props) {
  let [note, editNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    let { value, name } = event.target;

    editNote((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <form>
        <input
          required
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          required
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            props.addNote(note, editNote);
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
