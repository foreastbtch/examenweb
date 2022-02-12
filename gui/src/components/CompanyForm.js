import { useState } from "react";
import "./styles/CompanyForm.css";

function CompanyForm(props) {
    const { onAdd } = props;
    const [nume, setNume] = useState("");
    const [data, setData] = useState("");

    const addCompany = () => {
        onAdd({
            nume,
            data
        })
    }

    return(
        <div className="company-form">
            <h5>Add a Company</h5>
            <div className="nume">
                <input type="text" placeholder="nume" onChange={(evt)=>setNume(evt.target.value)}></input>
            </div>
            <div className="data">
                <input type="text" placeholder="data" onChange={(evt)=>setData(evt.target.value)}></input>
            </div>
            <div className="add">
                <input type = "button" value="Adauga" onClick={addCompany}></input>
            </div>
        </div>
    )
}

export default CompanyForm;