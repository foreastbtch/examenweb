import { useEffect, useState } from "react";
import Company from "./Company";
import "./styles/CompanyList.css"
import CompanyForm from "./CompanyForm";
import UpdateCompany from "./UpdateCompany";
import DeleteCompany from "./DeleteCompany";
import FounderList from "./FounderList.js";

const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

function CompanyList() {
    const [companies,setCompanies] = useState([]);
    const [id1,setId]=useState(0);
    const [filter1,setFilter1]=useState("");
    const [filter2,setFilter2]=useState("");
    const [sort1,setSort1]=useState("nume");
    const [sort,setSort]=useState(0);
    const getCompanies = async () =>{
        const response = await fetch(`${SERVER}/companies`);
        const data = await response.json();
        setCompanies(data);
    }

    const getCompaniesFiltered = async () =>{
        const response = await fetch(`${SERVER}/companies?filterNume=${filter1}&filterData=${filter2}`);
        const data = await response.json();
        setCompanies(data);
    }

    const getCompaniesSorted = async () =>{
        const response = await fetch(`${SERVER}/sort?sortBy=${sort1}`);
        const data = await response.json();
        setCompanies(data);
    }

    const addCompany = async(company)=>{
        await fetch(`${SERVER}/companies`, {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(company)
        })
        getCompanies();
    }

    const updateCompany = async(company)=>{
        await fetch(`${SERVER}/companies/${company.id}`, {
            method: "put",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(company)
        })
        getCompanies();
    }

    const deleteCompany = async(company)=>{
        await fetch(`${SERVER}/companies/${company.id}`, {
            method: "delete",
            headers: {
                "Content-Type":"application/json"
            }
        })
        getCompanies();
    }

    const updateId = async(id)=>{
        setId(id);
    }

    useEffect(()=>{
        getCompanies();
    },[])
    return(
        <div className="company-list">
            <div className="filter">
                <h5>Filter</h5>
                <div className="nume">
                    <input type="text" placeholder="nume" onChange={(evt)=>setFilter1(evt.target.value)}></input>
                </div>
                <div className="data">
                    <input type="text" placeholder="data" onChange={(evt)=>setFilter2(evt.target.value)}></input>
                </div>
                <div className="filter">
                    <input type = "button" value="Filter" onClick={()=>{if(filter1 !=="" && filter2!=="")getCompaniesFiltered()}}></input>
                </div>
                {/* <div className="sort">
                    <input type = "button" value="Sort Companies ASC/DESC" onClick={()=>{if(sort===0){setSort(1)}else {setSort(0)}}}></input>
                </div> */}
                <div className="sort">
                    <input type = "button" value="Sort Companies ASC/DESC" onClick={()=>{if(sort1==="nume"){setSort1("data")}else {setSort1("nume")};getCompaniesSorted()}}></input>
                </div>
            </div>
            {
                // companies.sort((a,b)=>{if(sort===1){return a.data>b.data?1:((b.data>a.data)?-1:0)}else return a.data<b.data?1:((b.data<a.data)?-1:0)}).map(e=><Company key={e.id} item={e} onSet={updateId}></Company>)
                companies.map(e=><Company key={e.id} item={e} onSet={updateId}></Company>)
            }
            <CompanyForm onAdd={addCompany}></CompanyForm>
            <UpdateCompany onUpdate={updateCompany}></UpdateCompany>
            <DeleteCompany onDelete={deleteCompany}></DeleteCompany>
            <FounderList id={id1}></FounderList>
        </div>
    )
}

export default CompanyList;