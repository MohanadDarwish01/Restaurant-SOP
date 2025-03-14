import { useNavigate } from 'react-router-dom';
import NavHeader from '../../components/NavHeader/NavHeader'
import { useCart, useCategoriesData } from '../../store'
import style from './Categories.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import SideCart from '../../components/SideCart/SideCart';



export default function Categories() {

  const { domain, setActiveId, data: appCategories } = useCategoriesData();
  const navigate = useNavigate();

  const openCategory = (documentId) => {
    navigate(documentId);
    setActiveId(documentId);


  }


  return (
    <div className={style.Categories}>
      
      <NavHeader tabName={"Category"} />
      <div className=' d-flex flex-wrap col-12 p-2 '>
        {
          appCategories.map((el) => (
            <div key={el.documentId} className=' col-10 col-md-6 col-lg-4 p-2' onClick={() => { openCategory(el.documentId) }} >
              <div className={style.productCard + ' rounded shadow border col-12 p-3'} >
                <img src={domain + el.category_img.url} alt="" />
                <p> {el.category_name} </p>
              </div>
            </div>
          ))
        }

      </div>

    </div>
  )
}
