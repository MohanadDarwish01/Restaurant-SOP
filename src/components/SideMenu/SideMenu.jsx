import style from './SideMenu.module.css'
import { PiCashRegister } from "react-icons/pi";
import { MdSpaceDashboard } from "react-icons/md";

import { useEffect, useState } from 'react';
import { IoFastFood } from 'react-icons/io5';
import { FaSackDollar } from 'react-icons/fa6';
import { IoSettings } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { useCategoriesData } from '../../store';



export default function SideMenu() {
    const { domain } = useCategoriesData()
    const [links] = useState([
        { id: 1, name: "Dashboard", icon: <MdSpaceDashboard />, path: "/" },
        { id: 2, name: "Food & Drinks", icon: <IoFastFood />, path: "/orders" },
        { id: 3, name: "Invoices", icon: <FaSackDollar />, path: "/invoices" },
        { id: 4, name: "Settings", icon: <IoSettings />, path: "/settings" },
    ]);

    const [userInfo, setUserInfo] = useState({})
    const Navigate = useNavigate();

    const hanldeLogout = () => {
        sessionStorage.clear();
        Navigate('/login')
    }
    const [activeLink, setActiveLink] = useState(0);



    useEffect(() => {
        let userInfo = JSON.parse(sessionStorage.getItem("user Info"));
        
        if (userInfo) {
            

            let url = domain + `/api/pos-users/${userInfo.user_id}`;
            axios.get(url).then(() => {
                setUserInfo(userInfo);
            }).catch(() => {
                sessionStorage.clear();
                Navigate('/login');
            })
        } else {
            sessionStorage.clear();
            Navigate('/login');
        }
    }, [])


    return (
        <div className=" d-flex flex-column border-end" id={style.SideMenu}>
            <div className=' col-12 d-flex align-items-center gap-2 p-3'>
                <PiCashRegister className={style.icon} />
                <p className=' fs-4 m-0'> Smart <span id={style.logo}>POS</span></p>

            </div>

            <div className=' col-12 d-flex flex-column gap-2 align-items-center p-3'>
                {
                    links.map((el, index) => {
                        return (
                            <Link onClick={() => setActiveLink(index)} key={el.id} to={el.path} className={
                                " w-100 nav-link rounded d-flex align-items-center gap-2 py-2 px-4 "
                                + style.hovLink + " "
                                + (activeLink == index ? style.activeLink : null)
                            }>
                                {el.icon}
                                <span className=' m-0 '>{el.name}</span>
                            </Link>
                        );
                    })
                }

            </div>
            <div className="col-12 d-flex flex-column align-items-center">
                <FaUserCircle className="fs-3" />
                <img id={style.userImg} />
                <h5>{userInfo.user_name}</h5>
                <p>{userInfo.user_role}</p>
                <button className="btn btn-primary" onClick={hanldeLogout}>Logout</button>
            </div>
        </div>
    )
}
