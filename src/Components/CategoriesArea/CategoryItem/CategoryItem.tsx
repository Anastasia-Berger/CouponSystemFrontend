import { Category } from "../../../Models/Enums/Category";
import "./CategoryItem.css";

interface CategoryItemProps {
    categoryImage: string;
    category: Category;
}

function CategoryItem(props: CategoryItemProps): JSX.Element {
    return (
        <div className="CategoryItem">

            {props.categoryImage}
            {props.category}

        </div>
    );
}

export default CategoryItem;
