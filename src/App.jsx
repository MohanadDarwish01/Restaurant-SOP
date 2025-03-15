// Routes
// Main Layout
// Main Components

import { Route, Routes, useLocation } from "react-router-dom";
import DashBoard from "./pages/DashBoard/DashBoard";
import SideMenu from "./components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import Categories from "./pages/Categories/Categories";
import { useCart, useCategoriesData } from "./store";
import axios from "axios";
import SideCart from "./components/SideCart/SideCart";
import InvoicesPage from "./pages/Invoices/Invoices";


export default function App() {
    const { domain, setData ,categories } = useCategoriesData();
    const { cartIndex } = useCart();

    const [acceptedPath , setAcceptedPath ] = useState(["/", "/orders", "/settings", "/invoices"]) ;
    const [path, setPath] = useState();
    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname])

    useEffect(() => {
        let url = domain + "/api/categories"
        axios.get(url , {
            params:{
                populate: "*",
            }
        }).then((res)=>{
            let cats = res.data.data;
            const routes = cats.map((el)=>('/orders/' + el.documentId));
            setAcceptedPath([...acceptedPath , ...routes]);
            setData(cats);
        })
    }, [])


    return (
        <div className=" App col-12 d-flex ">
            {cartIndex && <SideCart /> }
            {acceptedPath.includes(path) ? <SideMenu /> : null}
            <Routes>
                <Route path="/" element={<DashBoard />}></Route>
                <Route path="/orders" element={<Categories />}></Route>
                <Route path="/orders/:id" element={<CategoryProducts />}></Route>
                <Route path="/settings" element={<h1>Settings</h1>}></Route>
                <Route path="/invoices" element={<InvoicesPage />}></Route>
                <Route path="/login" element={<h1>Login Page</h1>}></Route>
                <Route path="*" element={<h1>404 Page</h1>}></Route>
            </Routes>
        </div>
    )
}
