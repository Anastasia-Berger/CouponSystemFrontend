import moment from "moment";
import "./EndDate.css";

interface endDateProps {
    endDate : Date;
}

function EndDate(props: endDateProps): JSX.Element {
    return (
        <div className="EndDate">
			<p>To : {moment(props.endDate).format('DD/MM/YYYY')}</p>
        </div>
    );
}

export default EndDate;
