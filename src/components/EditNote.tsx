import "../css/Notes.css"
import { useParams } from "react-router-dom"
import { AxiosResponse } from "axios"
import { instance } from "../customCode/ApiUrl";
import { useState, useEffect } from "react";
import { noteData } from "../customCode/types";
import { FaAngleLeft } from "react-icons/fa6";

const EditNote = () => {
    const { id } = useParams()
    const [note, setNote] = useState<noteData | null>(null)
    const fetchNoteData = async () => {
        try {
            const response: AxiosResponse = await instance.get(`/api/note/${String(id)}`);

            const responseData: noteData = response.data;
            setNote(responseData)
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        fetchNoteData()
    }, [])

    return (
        <div className="note-item">
            <div className="note-header">
                <FaAngleLeft/>
                <h4>Done</h4>
            </div>
            <div className="note-title">
                <textarea defaultValue={note?.title.toString()}></textarea>
            </div>
            <div className="note-text">
                <textarea defaultValue={note?.body.toString()}></textarea>
            </div>
        </div>
    )
}

export default EditNote