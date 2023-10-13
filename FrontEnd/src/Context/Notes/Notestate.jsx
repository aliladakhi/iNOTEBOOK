import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesArray = [];

  const [notes, setState] = useState(notesArray);


  const getAllNotes=async ()=>{
    const response=await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyMDE2YzFhNGNjNGI5Y2RjOGRjYzc0In0sImlhdCI6MTY5NjYwMTgxMn0.4doase39Syi6vvHVGpf7pD6g-o75zbtiGKnNf4cRVjA", // Replace with your actual auth token
      }
    });

    const json=await response.json();
    setState(json)
    console.log(json)
  }



//add a note
  const addNote = async (note) => {
    const url = `${host}/api/notes/addnote`;
    const data = note ;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyMDE2YzFhNGNjNGI5Y2RjOGRjYzc0In0sImlhdCI6MTY5NjYwMTgxMn0.4doase39Syi6vvHVGpf7pD6g-o75zbtiGKnNf4cRVjA", // Replace with your actual auth token
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to add note. Status: ${response.status}`);
      }
      
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  };

//update a note
  const updateNote = async (id,title,tag,description) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const data = {title,tag,description};
    try {
      
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyMDE2YzFhNGNjNGI5Y2RjOGRjYzc0In0sImlhdCI6MTY5NjYwMTgxMn0.4doase39Syi6vvHVGpf7pD6g-o75zbtiGKnNf4cRVjA",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            title,
            tag,
            description,
          };
        }
        return note;
    })}catch (error) {
        console.log("server not responding")  
    }
  };



//Delete a note
  const deleteNote = async (id) => {
try {
  
  
  const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers: {
      "Content-Type": "application/json",
      "auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyMDE2YzFhNGNjNGI5Y2RjOGRjYzc0In0sImlhdCI6MTY5NjYwMTgxMn0.4doase39Syi6vvHVGpf7pD6g-o75zbtiGKnNf4cRVjA", // Replace with your actual auth token
    }
  });
  const newNotes = notes.filter((note) => { return note._id !== id })
  setNotes(newNotes)
} catch (error) {
    console.log("server not responding")  
}
  };



  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote,getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
