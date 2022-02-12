import "./styles/Founder.css";

function Founder(props){
    const {item}=props;
    return(
        <div className="founder">
            <div className="nume">
                {item.nume}
            </div>
            <div className="rol">
                {item.rol}
            </div>
            <div className="companie">
                <h5>Company</h5>
                {item.CompanyId}
            </div>
        </div>
    )
}

export default Founder;