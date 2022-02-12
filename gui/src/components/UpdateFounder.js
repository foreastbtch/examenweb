import { useState } from "react";
import "./styles/UpdateFounder.css";

function UpdateFounder(props) {
    const { onUpdate } = props;
    const [id, setId] = useState(0);
    const [idParinte, setIdParinte] = useState(0);
    const [nume, setNume] = useState("");
    const [rol, setRol] = useState("");

    const updateFounder = () => {
        onUpdate(
            idParinte
            ,{
                id,
                nume,
                rol
        })
    }

    return(
        <div className="founder-form-update">
            <h5>Update Founder</h5>
            <div className="id">
                <input type="text" placeholder="idParinte" onChange={(evt)=>setIdParinte(evt.target.value)}></input>
            </div>
            <div className="id">
                <input type="text" placeholder="idCopil" onChange={(evt)=>setId(evt.target.value)}></input>
            </div>
            <div className="nume">
                <input type="text" placeholder="nume" onChange={(evt)=>setNume(evt.target.value)}></input>
            </div>
            <div className="rol">
                <input type="text" placeholder="rol" onChange={(evt)=>setRol(evt.target.value)}></input>
            </div>
            <div className="update">
                <input type = "button" value="Update" onClick={updateFounder}></input>
            </div>
        </div>
    )
}

export default UpdateFounder;