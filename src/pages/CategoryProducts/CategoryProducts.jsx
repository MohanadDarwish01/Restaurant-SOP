import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import NavHeader from "../../components/NavHeader/NavHeader";
import { useCategoriesData } from "../../store";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";

export default function CategoryProducts() {


    let navegate = useNavigate();
    const [check, setCheck] = useState(true);
    const params = useParams();
    const { domain, resetActiveId, active_cat_id } = useCategoriesData();
    const [categoryInfo, setCategoryInfo] = useState({});


    useEffect(() => {
        let documentId = params.id;
        let endPoint = `/api/categories/${documentId}`;
        let url = domain + endPoint;
        axios.get(url, {
            params: { populate: {
                products:{populate: "*"}
            } }
        }).then((res) => {
            // console.log(res.data.data);
            setCategoryInfo(res.data.data);
            setCheck(true);
        }).catch((err) => {
            navegate('/error')
        })

        // let obj = categories.find((el) => {
        //     return el.documentId == active_cat_id;
        // })
        // if (obj) {
        //     setCategoryInfo(obj);
        //     setCheck(true);
        // } else {
        //     navegate("/error");
        // }


        return () => {
            resetActiveId();
        }


    }, [])





    return (
        check && <div className=" flex-grow-1 overflow-auto">
            <NavHeader tabName={categoryInfo.category_name} />
            <h1>Products in Cat : {categoryInfo.category_name}</h1>
            <div className=" col-12 d-flex flex-wrap ">

                {
                    categoryInfo.products && categoryInfo.products.map((el) => (
                        <ProductCard key={el.documentId} 
                        productName={el.product_name} productPrice={el.product_price}  productImg={el.product_img.url} product={el}
                        />
                    ))
                }
                {
                    categoryInfo.products && categoryInfo.products.length == 0 && <h1> There are no products</h1>
                }
                
            </div>
        </div>
    )
}
