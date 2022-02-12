import "./styles/Company.css";
import { useState, useEffect } from "react";

function Company(props){
    const {item}=props;
    const {onSet}=props;
    const [id, setId] = useState(item.id);

    const setare = () => {
        onSet({
            id
        })
    }
    return(
        <div className="company">
            <div className="nume">
                {item.nume}
            </div>
            <div className="data">
                {item.data}
            </div>
            <input type = "button" value="Afisare fondatori" onClick={setare}></input>
        </div>
    )
}

export default Company;