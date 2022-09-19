import globals from "../../../Services/Globals";
import "./Avatar.css";

interface AvatarProps {
    uuid: any;
}

function Avatar(props: AvatarProps): JSX.Element {

    const url = globals.urls.users + props.uuid;
    console.log(url);

    return (
        <div className="Avatar">
            <img src={url} ></img>
        </div>
    );
}
export default Avatar;
