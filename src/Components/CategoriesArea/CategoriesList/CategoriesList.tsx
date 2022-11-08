import { useEffect, useState } from "react";
import { Category } from "../../../Models/Enums/Category";
import store from "../../../Redux/store";
import { getAllCouponsByCategory } from "../../../Web API/CouponsApi";
import CategoryItem from "../CategoryItem/CategoryItem";
import "./CategoriesList.css";

function CategoriesList(): JSX.Element {

    // const [category, setCategory] = useState<Category>();

    // useEffect(() => {
    //         getAllCouponsByCategory(category)
    //             .then((res) => {
    //                 // Updating Component State
    //                 setCategory(res.data);
    //                 // Updating global state
    //                 store.dispatch(category(res.data));
    //                 // notify.success(SccMsg.GOT_TASKS);
    //             })
    //             .catch((err) => { /*notify.error(err);*/ });
    // }, []);
    
    return (
        <div className="CategoriesList">
            {/* {category.map(() => <CategoryItem key={category} category={category} categoryImage={" "} />)} */}

        </div>
    );
}

export default CategoriesList;
