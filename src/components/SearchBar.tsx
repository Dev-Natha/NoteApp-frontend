import { noteData } from "../customCode/types";
import { useRef } from "react";
type searchProp = {
    placehold: String
    notes: noteData[]
    filteredNotes: noteData[] | undefined
    setFilteredNotes: React.Dispatch<React.SetStateAction<noteData[] | undefined>>
}

const SearchBar = ({placehold, notes, setFilteredNotes}:searchProp) => {
function filterNotes(searchText:string | undefined){
  if (searchText){
    setFilteredNotes(notes.filter((note) => note.title.toLowerCase().includes(searchText.toLowerCase()) || note.body.toLowerCase().includes(searchText.toLowerCase())))
  }
  else{
    setFilteredNotes(notes)
  }
}
const searchRef = useRef<HTMLInputElement>(null)
  return (
    <div className="note-inp-cont">
        <div className="note-inp"><input type="text" placeholder={placehold.toString()} ref={searchRef} onChange={()=> filterNotes(searchRef.current?.value)}/></div>
    </div>
  )
}

export default SearchBar