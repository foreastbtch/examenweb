import { useEffect, useState } from "react";
import Founder from "./Founder";
import "./styles/FounderList.css"
import FounderForm from "./FounderForm";
import UpdateFounder from "./UpdateFounder";
import DeleteFounder from "./DeleteFounder";

const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

function FounderList(props) {
    const [founders, setFounders] = useState([]);
    const { id } = props;
    const [id1, setId1] = useState(id);
    const getFounders = async() => {
        const response = await fetch(`${SERVER}/founders`);
        const data = await response.json();
        setFounders(data);
    }

    const addFounder = async(idParinte, founder) => {
        await fetch(`${SERVER}/companies/${idParinte}/founders`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(founder)
        })
        getFounders();
    }
    const updateFounder = async(idParinte, founder) => {
        await fetch(`${SERVER}/companies/${idParinte}/founders/${founder.id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(founder)
        })
        getFounders();
    }

    const deleteFounder = async(idParinte, id) => {
        await fetch(`${SERVER}/companies/${idParinte}/founders/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        })
        getFounders();
    }

    useEffect(() => {
        setId1(id);
        getFounders();
    }, [id])
    return ( 
        <div className="founder-list"> {
            founders
            .filter((val) => { if (val.CompanyId == id.id) return val })
            .map(e => <Founder key={e.id} item={e}></Founder>)
            } 
            <FounderForm onAdd={addFounder}></FounderForm> 
            <UpdateFounder onUpdate={updateFounder}></UpdateFounder>
            <DeleteFounder onDelete={deleteFounder}></DeleteFounder>
        </div>
        )
    }

    export default FounderList;