// Routes
// Main Layout
// Main Components

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import DashBoard from "./pages/DashBoard/DashBoard";
import SideMenu from "./components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import img from './assets/imgs/category/wok.png'
import Categories from "./pages/Categories/Categories";
import { useCategoriesData } from "./store";


export default function App() {
    const { categories } = useCategoriesData();
    
    let catRoutes = categories.map((el)=>("/orders/" + el.path));
    let acceptedPath = ["/" , "/orders" , "/settings" , "/bills" , ...catRoutes];
    const [path , setPath] = useState();
    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname])


    return (
        <div className=" App col-12 d-flex ">
            {acceptedPath.includes(path) ? <SideMenu /> : null}
            <Routes>
                <Route path="/" element={<DashBoard />}></Route>
                <Route path="/orders" element={<Categories />}></Route>
                <Route path="/orders/:category" element={<CategoryProducts />}></Route>
                <Route path="/settings" element={<h1>Settings</h1>}></Route>
                <Route path="/bills" element={<h1>Bills</h1>}></Route>
                <Route path="/login" element={<h1>Login Page</h1>}></Route>
                <Route path="*" element={<h1>404 Page</h1>}></Route>
            </Routes>
        </div>
    )
}
