import "./Page404.css";

function Page404(): JSX.Element {
    return (
        <div className="Page404">
            <p>We must have gone wrong on the galaxy path...</p>
            <p>4 0 4</p>
			<img src={require('./../../../Assets/Images/Page404.png')} />
        </div>
    );
}

export default Page404;
