import "../css/Notes.css"
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import { noteProps, noteData } from "../customCode/types";
import SearchBar from "./SearchBar";
import { useState } from "react";
const Notes = ({notes}:noteProps) => {
  const [filteredNotes, setFilteredNotes] = useState<noteData[] | undefined>()
  function formatNote(note:String):String{
    if (note.length > 35){
      const noteSplice = note.slice(0, 35)
      return noteSplice + "..."
    }
    return note
  }
  function displayNotes(notes: noteData[]) {
    return notes.map((note) => (
      <Link to={`/note/${note.id}`} key={String(note.id)}>
        <div className="note-item-element">
          <h1>{note.title ? formatNote(note.title) : "(no title)"}</h1>
          <p>{formatNote(note.body)}</p>
          <span>{new Date(note.updated.toString()).toLocaleString()}</span>
        </div>
      </Link>
    ));
  }
  
  return (
    <div className="note-item">
      <SearchBar placehold={"Search Notes"} notes={notes} filteredNotes={filteredNotes} setFilteredNotes={setFilteredNotes}/>
      <div className="note-item-cont">
        {filteredNotes? displayNotes(filteredNotes) : displayNotes(notes)}
      </div>
      <div className="add-icon-cont">
        <Link to={"note"}>
          <GoPlus className="add-icon" />
        </Link>
      </div>
    </div>
  )
}

export default Notes