import "../css/Notes.css"
import { useParams, useNavigate} from "react-router-dom"
import { AxiosResponse } from "axios"
import { instance } from "../customCode/ApiUrl";
import { useState, useEffect, useRef } from "react";
import { noteData } from "../customCode/types";
import { FaAngleLeft } from "react-icons/fa6";
import { singleNoteData } from "../customCode/types";
import { fetchNoteProps } from "../customCode/types";

const EditNote = ({fetchData}:fetchNoteProps) => {
    const { id } = useParams()
    const [note, setNote] = useState<noteData | null>(null)
    const fetchNoteData = async () => {
        try {
            const response: AxiosResponse = await instance.get(`/api/note/${String(id)}/`);
            const responseData: noteData = response.data;
            setNote(responseData)
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        fetchNoteData()
    }, [])

    const titleref = useRef<HTMLTextAreaElement>(null)
    const bodyref = useRef<HTMLTextAreaElement>(null)
    const navigate = useNavigate()

    const sendData = async(noteData:singleNoteData) =>{
        try{
            const response: AxiosResponse = await instance.put(`/api/note/${String(id)}/`, noteData)
            const responseData: noteData = response.data
            setNote(responseData)
        }
        catch(error){
            console.log(error)
        }
    }
    function editNote(id:Number | undefined){
        const noteData = {
            title: titleref.current?.value,
            body: bodyref.current?.value
        }
        if (!noteData.title && !noteData.body){
            deleteNote(id)
        }
        else{
            if(noteData.title !== note?.title || noteData.body !== note?.body){
                sendData(noteData)
            }
        }
        navigate("/")
        fetchData()
    }
    const deleteData = async (id:Number) => {
        try{
            await instance.delete(`/api/note/${String(id)}/`)
        }
        catch(error){
            console.log(error)
        }
    }   
    function deleteNote(id:Number | undefined){
        if (id){
            deleteData(id)
            navigate("/")
            fetchData()
        }
    }
    return (
        <div className="note-item">
            <div className="note-header">
                <FaAngleLeft className="angle-left" onClick={() => editNote(note?.id)}/>
                <h4 onClick={() => deleteNote(note?.id)}>Delete</h4>
            </div>
            <div className="note-title">
                <textarea defaultValue={note?.title.toString()} placeholder="Title" ref={titleref}></textarea>
            </div>
            <div className="note-text">
                <textarea defaultValue={note?.body.toString()} placeholder="Note something down" ref={bodyref}></textarea>
            </div>
        </div>
    )
}

export default EditNote