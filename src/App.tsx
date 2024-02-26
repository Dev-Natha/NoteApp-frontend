import './App.css'
import BottomBar from './components/BottomBar'
import { MdOutlineStickyNote2 } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Notes from './components/Notes';
import { Route, Routes, useNavigate, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { noteData } from "./customCode/types";
import EditNote from './components/EditNote';
import CreateNote from './components/CreateNote';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [noteActiveTab, toggleNoteActiveTab] = useState("bottombar-active")
  const [todoActiveTab, toggleTodoActiveTab] = useState("")
  const navigate = useNavigate()
  const [loggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true')
  const [username, setUsername] = useState("")
 

  function logout(){
    try {
      fetch('http://localhost:8000/api/logout/', {
      method: "POST",
       headers: {'Content-Type': 'application/json'},
       credentials: 'include',
       })
       .then((resp) => resp.json())
       .then((data) => {
        console.log(data)
         localStorage.removeItem("loggedIn")
         validateLogin()
       })
       } catch (error) {
         console.log(error)
 
       }
  }

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
    const response = await fetch('http://localhost:8000/api/note', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          });
    
    const responseData: noteData[] = await response.json();
    setNotes(responseData)
    
    } catch (error) {
      console.log(error)
    }
    
  };
  
  const validateLogin = () => {
    try {
     fetch('http://localhost:8000/api/user', {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.id){
          localStorage.setItem('loggedIn', 'true');
          setIsLoggedIn(true)
          setUsername(data.username)
          fetchData()
        }
        else{
          localStorage.removeItem('loggedIn');
          setIsLoggedIn(false)
          setUsername("")
          return navigate("/login")
        }
      })
      } catch (error) {
        console.log(error)

      }
  }

  useEffect(()=>{
    validateLogin()
  }, [])

  

  return (
    <>
      <div className='note-body'>
        <div className="note-container">
          <div className='note-head'>
            <h2>{noteActiveTab === "bottombar-active" ? "Notes" : "To-dos"}</h2>
            {username && <p>Hello {username} &nbsp; <span><Link to={""} onClick={logout}>Logout</Link></span></p>}
          </div>
          <div className="note-item">
          <Routes>
            <Route path='/' element={loggedIn ? <Notes notes={notes}/> : <Navigate to={"/login"}/>}/>
            <Route path='/note/:id' element={loggedIn ? <EditNote validateLogin={validateLogin}/>: <Navigate to={"/login"}/>}/>
            <Route path='/note' element={loggedIn ? <CreateNote  validateLogin={validateLogin}/> : <Navigate to={"/login"}/>}/>
            <Route path='/register' element={loggedIn ? <Navigate to={"/"}/> : <RegisterForm validateLogin={validateLogin} />}/>
            <Route path='/login' element={loggedIn ? <Navigate to={"/"}/> : <LoginForm validateLogin={validateLogin} />}/>
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
