// Routes
// Main Layout
// Main Components

import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard/DashBoard";
import SideMenu from "./components/SideMenu/SideMenu";


export default function App() {
    let acceptedPath = ["" , "order" , "settings" , "bills"];
    let url = window.location.href;
    let path = url.split("/")[3];
    console.log(path)

    return (
        <div className=" App col-12 d-flex ">
            <BrowserRouter>
                {acceptedPath.includes(path) ? <SideMenu /> : null}
                <Routes>
                    <Route path="/" element={<DashBoard />}></Route>
                    <Route path="/order" element={<h1>Food AND Drinks</h1>}></Route>
                    <Route path="/settings" element={<h1>Settings</h1>}></Route>
                    <Route path="/bills" element={<h1>Bills</h1>}></Route>
                    <Route path="/login" element={<h1>Login Page</h1>}></Route>
                    <Route path="*" element={<h1>404 Page</h1>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
