import "./EmptyView.css";

interface EmptyViewProps {
    msg: string;
}

function EmptyView(props: EmptyViewProps): JSX.Element {
    return (
        <div className="EmptyView">
            <h3>{props.msg}</h3>
            <img src="https://media.giphy.com/media/f60tgCAj8D07VvpT76/giphy.gif" />
        </div>
    );
}

export default EmptyView;
