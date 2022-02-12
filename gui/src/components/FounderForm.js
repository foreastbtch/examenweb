import { useState } from "react";
import "./styles/FounderForm.css";

function FounderForm(props) {
    const { onAdd } = props;
    const [idParinte, setIdParinte] = useState(0);
    const [nume, setNume] = useState("");
    const [rol, setRol] = useState("");

    const addFounder = () => {
        onAdd(
            idParinte,{
            nume,
            rol
        })
    }

    return(
        <div className="founder-form">
            <h5>Add a Founder</h5>
            <div className="idParinte">
                <input type="text" placeholder="id Companie" onChange={(evt)=>setIdParinte(evt.target.value)}></input>
            </div>
            <div className="nume">
                <input type="text" placeholder="nume" onChange={(evt)=>setNume(evt.target.value)}></input>
            </div>
            <div className="rol">
                <input type="text" placeholder="rol" onChange={(evt)=>setRol(evt.target.value)}></input>
            </div>
            <div className="add">
                <input type = "button" value="Adauga" onClick={addFounder}></input>
            </div>
        </div>
    )
}

export default FounderForm;