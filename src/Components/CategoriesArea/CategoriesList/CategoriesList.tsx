import { useEffect, useState } from "react";
import { Category } from "../../../Models/Enums/Category";
import CategoryItem from "../CategoryItem/CategoryItem";

import categoryItem from "../../../data/categoryItem.json";
import "./CategoriesList.css";

function CategoriesList(): JSX.Element {

    return (
        <div className="CategoriesList">


{categoryItem.map( categoryItem =>
    (
        <CategoryItem {...categoryItem}/>
    )
    )}

            {/* <CategoryItem categoryImage={""} category={Category.FOOD} />
            <CategoryItem categoryImage={""} category={Category.RESTAURANT} />
            <CategoryItem categoryImage={""} category={Category.VACATION} />
            <CategoryItem categoryImage={""} category={Category.CLOTHING} />
            <CategoryItem categoryImage={""} category={Category.PHARMA} />
            <CategoryItem categoryImage={""} category={Category.SPORTS} />
            <CategoryItem categoryImage={""} category={Category.ELECTRONICS} />
            <CategoryItem categoryImage={""} category={Category.GAMING} /> */}

        </div>
    );
}

export default CategoriesList;
