import { useState } from "react";
import "./styles/DeleteCompany.css";

function DeleteCompany(props) {
    const { onDelete } = props;
    const [id, setId] = useState(0);
    const [nume, setNume] = useState("");
    const [data, setData] = useState("");

    const deleteCompany = () => {
        onDelete({
            nume,
            data,
            id
        })
    }

    return(
        <div className="company-form-delete">
            <h5>Delete a Company</h5>
            <div className="id">
                <input type="text" placeholder="id" onChange={(evt)=>setId(evt.target.value)}></input>
            </div>
            <div className="delete">
                <input type = "button" value="Delete" onClick={deleteCompany}></input>
            </div>
        </div>
    )
}

export default DeleteCompany;