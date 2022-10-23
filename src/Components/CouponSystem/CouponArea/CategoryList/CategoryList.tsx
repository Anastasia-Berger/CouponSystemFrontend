import { useState } from "react";
import { Category } from "../../../../Models/Enums/Category";
import CategoryItem from "../CategoryItem/CategoryItem";
import "./CategoryList.css";

function CategoryList(): JSX.Element {

    const [categories] = useState<Category[]>([]);


    return (
        <div className="CategoryList">
            CATEGORIES
            {categories.map((category: Category) => <CategoryItem key={category} category={category} />)}

        </div>
    );
}

export default CategoryList;
