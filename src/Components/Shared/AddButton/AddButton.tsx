import "./AddButton.css";

interface AddButtonProps{
    value: string;
}

function AddButton(props: AddButtonProps): JSX.Element {
    return (
        <div className="AddButton">
            <button className="icon-btn add-btn">
                <div className="add-icon"></div>
                <div className="btn-txt">Add {props.value}</div>
            </button>
        </div>
    );
}

export default AddButton;
