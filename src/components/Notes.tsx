import { useEffect, useState } from "react";
import "../css/Notes.css"
import {AxiosResponse} from "axios"
import { instance } from "../customCode/ApiUrl";
import { noteData } from "../customCode/types";


const Notes = () => {
  const [notes, setNotes] = useState<noteData[] | null>(null)
  const fetchData = async () => {
    try {
    
    const response: AxiosResponse = await instance.get('/api/note/');
    
    const responseData: noteData[] = response.data;
    setNotes(responseData)
    
    } catch (error) {
      console.log(error)
    }
    
  };  

  useEffect(()=>{
    fetchData()
  },[])
  
  return (
    <div className="note-item">
      <div className="note-inp-cont">
        <div className="note-inp"><input type="text" placeholder="Search Notes" /></div>
      </div>
      <div className="note-item-cont">
        {notes?.map(note => {
          return <div className="note-item-element">
            <h1>{note.title}</h1>
            <p>{note.body}</p>
            <span>{note.updated}</span>
          </div>
        })}
      </div>
       
    </div>
  )
}

export default Notes