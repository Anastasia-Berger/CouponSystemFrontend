import { Category } from "../../../../Models/Enums/Category";
import "./CategoryItem.css";


interface CategoryItemProps {
    
    category: Category;
}

function CategoryItem(props: CategoryItemProps): JSX.Element {
    return (
        <div className="CategoryItem">

            <img src='(globals.urls.category) + {props.category}' alt={props.category} />
            <h5>{props.category}</h5>

        </div>
    );
}

export default CategoryItem;
