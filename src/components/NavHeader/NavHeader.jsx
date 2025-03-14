import { IoMdArrowRoundBack } from 'react-icons/io'
import style from './NavHeader.module.css'
import { FaAngleRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useCart, useCategoriesData } from '../../store';
import { FaCartShopping } from 'react-icons/fa6';

export default function NavHeader({ tabName }) {

    const { openCart: open, closeCart: close, productsInCart } = useCart();
    const navigate = useNavigate();
    const { active_cat_id } = useCategoriesData();
    const handleClick = () => {
        navigate('/orders')
    }


    const openCart = () => {
        open();
    }

    return (
        <div>
            <header className=" col-12 d-flex align-items-center justify-content-between gap-3 p-3 w-100 ">

                <div className=' d-flex align-items-center justify-content-between gap-3 w-100'>
                    <div className=' d-flex gap-3'>
                        {active_cat_id != 0 && <IoMdArrowRoundBack className={style.backBtn} onClick={handleClick} />}
                        <div className=' d-flex align-items-center gap-2'>
                            <p className=' m-0'>Food & Drinks</p>
                            <FaAngleRight className={style.angle} />
                            <p className=' m-0'>{tabName}</p>
                        </div>
                    </div>

                    <div className=' d-flex align-items-center gap-2 cur'>
                        <FaCartShopping onClick={() => { openCart() }} />
                        <span className=' bg-danger text-white rounded-5 px-2 '>
                            {
                                productsInCart.reduce((acc , el) => (acc + el.qty) , 0)
                            }</span>
                    </div>
                </div>

            </header>
        </div>
    )
}
