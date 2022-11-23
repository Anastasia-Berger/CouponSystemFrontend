import "./CategoryItem.css";

interface CategoryItemProps {
    name: string;
    imgUrl: string;
    path: string;
    color: string;
}

function CategoryItem(props: CategoryItemProps): JSX.Element {
    return (
        <div className="CategoryItem" style={{backgroundColor: (props.color)}}>
            <a href={props.path}>
                <h5>{props.name}</h5>
                <img src={props.imgUrl} alt={props.name} />
            </a>
        </div >
    );
}

export default CategoryItem;
