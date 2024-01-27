import "../css/Notes.css"
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import { noteProps } from "../customCode/types";

const Notes = ({notes}:noteProps) => {
  function formatNote(note:String):String{
    if (note.length > 35){
      const noteSplice = note.slice(0, 35)
      return noteSplice + "..."
    }
    return note
  }
  return (
    <div className="note-item">
      <div className="note-inp-cont">
        <div className="note-inp"><input type="text" placeholder="Search Notes" /></div>
      </div>
      <div className="note-item-cont">
        {notes.map(note => {
          return <Link to={`/note/${note.id}`} key={String(note.id)}>
            <div className="note-item-element">
              <h1>{note.title?formatNote(note.title):"(no title)"}
              </h1>
              <p>{formatNote(note.body)}</p>
              <span>{new Date(note.updated.toString()).toLocaleString()}</span>
            </div>
          </Link>
        })}
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