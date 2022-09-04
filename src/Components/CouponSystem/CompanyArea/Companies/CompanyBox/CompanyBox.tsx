import { CompanyModel } from "../../../../../Models/BeansModel/CompanyModel";
import "./CompanyBox.css";

interface CompanyBoxProps {
    company: CompanyModel;
}

function CompanyBox(props: CompanyBoxProps): JSX.Element {
    return (
        <div className="CompanyBox">
			<div className="BoxImage">
                <img src={props.company.image} alt="yoda" />
            </div>

            <div className="CompanyDetails">
                <p>ID : {props.company.id} </p>
                <p>Name : {props.company.name}</p>
            </div>

        </div>
    );
}

export default CompanyBox;
