import moment from "moment";
import "./StartDate.css";

interface StartDateProps {
    startDate: Date,
}

function StartDate(props: StartDateProps): JSX.Element {
    return (
        <div className="StartDate">
            <p>From : {moment(props.startDate).format('DD/MM/YYYY')}</p>
        </div>
    );
}

export default StartDate;
