import "../css/Notes.css"
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import { noteProps } from "../customCode/types";

const Notes = ({notes}:noteProps) => {
  return (
    <div className="note-item">
      <div className="note-inp-cont">
        <div className="note-inp"><input type="text" placeholder="Search Notes" /></div>
      </div>
      <div className="note-item-cont">
        {notes.map(note => {
          return <Link to={`/note/${note.id}`} key={String(note.id)}>
            <div className="note-item-element">
              <h1>{note.title}</h1>
              <p>{note.body}</p>
              <span>{new Date(note.updated.toString()).toLocaleString()}</span>
            </div>
          </Link>
        })}
      </div>
      <div className="add-icon-cont">
        <GoPlus className="add-icon" />
      </div>
    </div>
  )
}

export default Notes