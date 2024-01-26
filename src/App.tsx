import './App.css'
import BottomBar from './components/BottomBar'
import { MdOutlineStickyNote2 } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Notes from './components/Notes';
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';

const iconStyle : React.CSSProperties = {
  fontSize : "20px",
}
function App() {
  const [noteActiveTab, toggleNoteActiveTab] = useState("bottombar-active")
  const [todoActiveTab, toggleTodoActiveTab] = useState("")

  function switchNote(){
    toggleNoteActiveTab("bottombar-active")
    toggleTodoActiveTab("")
  }

  function switchTodo (){
    toggleNoteActiveTab("")
    toggleTodoActiveTab("bottombar-active")
  }

  return (
    <>
      <div className='note-body'>
        <div className="note-container">
          <div className='note-head'>
            <h2>{noteActiveTab === "bottombar-active" ? "Notes" : "To-dos"}</h2>
          </div>
          <div className="note-item">
          <Routes>
            <Route path='/' element={<Notes/>}/>
          </Routes>
          </div>
        </div>
        <div className="bottom-bar" onClick={(e) => e}>
          <BottomBar icon={<MdOutlineStickyNote2 style={iconStyle}/>} text="Notes" classStyle={noteActiveTab} handleClick={switchNote}/>
          <BottomBar icon={<IoMdCheckmarkCircleOutline style={iconStyle}/>} text="To-dos" classStyle={todoActiveTab} handleClick={switchTodo}/>
        </div>
      </div>
    </>
  )
}

export default App
