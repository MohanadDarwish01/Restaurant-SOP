import { useNavigate } from 'react-router-dom';
import NavHeader from '../../components/NavHeader/NavHeader'
import { useCategoriesData } from '../../store'
import style from './Categories.module.css'



export default function Categories() {

  const { categories , setActiveId } = useCategoriesData();
  const navigate = useNavigate();
  const openCategory = (path , cat_Id) => {
    navigate(path);
    setActiveId(cat_Id);


  }

  
  return (
    <div className={style.Categories}>
      <NavHeader tabName={"Category"} />
      <div className=' d-flex flex-wrap col-12 p-2 '>
        {
          categories.map((el) => (
            <div key={el.documentId} className=' col-10 col-md-6 col-lg-4 p-2' onClick={()=>{openCategory(el.path , el.documentId)}} >
              <div className={ style.productCard + ' rounded shadow border col-12 p-3'} >
                <img src={el.catImg} alt="" />
                <p> {el.name} </p>
              </div>
            </div>
          ))
        }

      </div>

    </div>
  )
}
