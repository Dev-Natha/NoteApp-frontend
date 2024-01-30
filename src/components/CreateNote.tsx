import "../css/Notes.css"
import { useNavigate } from "react-router-dom"
import { AxiosResponse } from "axios"
import { instance } from "../customCode/ApiUrl";
import { useRef } from "react";
import { noteData } from "../customCode/types";
import { FaAngleLeft } from "react-icons/fa6";
import { singleNoteData } from "../customCode/types";
import { fetchNoteProps } from "../customCode/types";

const CreateNote = ({fetchData}:fetchNoteProps) => {
    const titleref = useRef<HTMLTextAreaElement>(null)
    const bodyref = useRef<HTMLTextAreaElement>(null)
    const navigate = useNavigate()

    const postData = async(noteData:singleNoteData) =>{
        try{
            const response: AxiosResponse = await instance.post("/api/note/", noteData)
            const responseData: noteData = response.data
            console.log(responseData)
        }
        catch(error){
            console.log(error)
        }
    }

    function postNote(){
        const noteData = {
            title: titleref.current?.value,
            body: bodyref.current?.value
        }
        if(noteData.title || noteData.body){
            postData(noteData)
        }
        navigate("/")
        fetchData()
    }

    return (
        <div className="note-item">
            <div className="note-header">
                <FaAngleLeft className="angle-left" onClick={postNote}/>
                <h4 onClick={postNote}>Done</h4>
            </div>
            <div className="note-title">
                <textarea placeholder="Title" ref={titleref}></textarea>
            </div>
            <div className="note-text">
                <textarea placeholder="Note something down" ref={bodyref}></textarea>
            </div>
        </div>
    )
}

export default CreateNote