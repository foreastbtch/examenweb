import { useState } from "react";
import "./styles/DeleteFounder.css";

function DeleteFounder(props) {
    const { onDelete } = props;
    const [id, setId] = useState(0);
    const [idParinte, setIdParinte] = useState(0);

    const deleteFounder = () => {
        onDelete(
            idParinte,
            id
        )
    }

    return(
        <div className="founder-form-delete">
            <h5>Delete a Founder</h5>
            <div className="id">
                <input type="text" placeholder="id Companie" onChange={(evt)=>setIdParinte(evt.target.value)}></input>
            </div>
            <div className="id">
                <input type="text" placeholder="id" onChange={(evt)=>setId(evt.target.value)}></input>
            </div>
            <div className="delete">
                <input type = "button" value="Delete" onClick={deleteFounder}></input>
            </div>
        </div>
    )
}

export default DeleteFounder;