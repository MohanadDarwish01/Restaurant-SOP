import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import NavHeader from "../../components/NavHeader/NavHeader";
import { useCategoriesData } from "../../store";

export default function CategoryProducts() {

    let navegate = useNavigate();
    const [check, setCheck] = useState(false);
    const params = useParams();
    const {categories , resetActiveId , active_cat_id} = useCategoriesData();
    const [categoryInfo , setCategoryInfo] = useState({});
    

    useEffect(() => {
        
        let obj = categories.find((el) => {
            return el.documentId == active_cat_id;
        })
        if (obj) {
            setCategoryInfo(obj);
            setCheck(true);
        } else {
            navegate("/error");
        }


        return () => {
            resetActiveId();
        }


    }, [])





    return (
        check && <div>
            <NavHeader tabName={categoryInfo.name} />
            <h1>Products in Cat : {categoryInfo.name}</h1>
        </div>
    )
}
