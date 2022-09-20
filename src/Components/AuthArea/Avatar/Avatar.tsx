import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
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
            <img src={url} className="cool-border"></img>
        </div>
    );
}
export default Avatar;
