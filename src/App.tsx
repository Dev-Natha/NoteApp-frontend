import './App.css'
import BottomBar from './components/BottomBar'
import { MdOutlineStickyNote2 } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Notes from './components/Notes';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import {AxiosResponse} from "axios"
import { instance } from "./customCode/ApiUrl";
import { noteData } from "./customCode/types";
import EditNote from './components/EditNote';
import CreateNote from './components/CreateNote';

function App() {
  const [noteActiveTab, toggleNoteActiveTab] = useState("bottombar-active")
  const [todoActiveTab, toggleTodoActiveTab] = useState("")
  const navigate = useNavigate()

  function switchNote(){
    toggleNoteActiveTab("bottombar-active")
    toggleTodoActiveTab("")
    navigate("/")
  }

  function switchTodo (){
    toggleNoteActiveTab("")
    toggleTodoActiveTab("bottombar-active")
  }

  const [notes, setNotes] = useState<noteData[]>([])
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
    <>
      <div className='note-body'>
        <div className="note-container">
          <div className='note-head'>
            <h2>{noteActiveTab === "bottombar-active" ? "Notes" : "To-dos"}</h2>
          </div>
          <div className="note-item">
          <Routes>
            <Route path='/' element={<Notes notes={notes}/>}/>
            <Route path='/note/:id' element={<EditNote fetchData={fetchData}/>}/>
            <Route path='/note' element={<CreateNote  fetchData={fetchData}/>}/>
          </Routes>
          </div>
        </div>
        <div className="bottom-bar" onClick={(e) => e}>
          <BottomBar icon={<MdOutlineStickyNote2 />} text="Notes" classStyle={noteActiveTab} handleClick={switchNote} />
          <BottomBar icon={<IoMdCheckmarkCircleOutline />} text="To-dos" classStyle={todoActiveTab} handleClick={switchTodo}/>
        </div>
      </div>
    </>
  )
}

export default App
