import { useState } from "react";
import "./styles/UpdateCompany.css";

function UpdateCompany(props) {
    const { onUpdate } = props;
    const [id, setId] = useState(0);
    const [nume, setNume] = useState("");
    const [data, setData] = useState("");

    const updateCompany = () => {
        onUpdate({
            nume,
            data,
            id
        })
    }

    return(
        <div className="company-form-update">
            <h5>Update a Company</h5>
            <div className="id">
                <input type="text" placeholder="id" onChange={(evt)=>setId(evt.target.value)}></input>
            </div>
            <div className="nume">
                <input type="text" placeholder="nume" onChange={(evt)=>setNume(evt.target.value)}></input>
            </div>
            <div className="data">
                <input type="text" placeholder="data" onChange={(evt)=>setData(evt.target.value)}></input>
            </div>
            <div className="update">
                <input type = "button" value="Update" onClick={updateCompany}></input>
            </div>
        </div>
    )
}

export default UpdateCompany;