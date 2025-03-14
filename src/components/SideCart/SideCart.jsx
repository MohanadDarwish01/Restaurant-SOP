import { useEffect, useState } from 'react';
import { useCart } from '../../store';
import style from './SideCart.module.css';
import Swal from 'sweetalert2';
import CheckOut from '../CheckOut/CheckOut';


export default function SideCart() {

    const { checkOutIndex, openCheckOut, openCart: open, closeCart: close, productsInCart, decrementQty, incrementQty, resetCart } = useCart();
    const closeCart = () => {
        close();
    }
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let newTotal = productsInCart.reduce((acc, el) => acc + (el.price * el.qty), 0);
        setTotal(newTotal);
        console.log(newTotal)
    }, [productsInCart])



    const handleReset = () => {
        Swal.fire({
            icon: "question",
            title: "Are you Sure",
            text: "You are going to delete all products in cart",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonText: "Yes Reset"

        }).then((res) => {
            if (res.isConfirmed) {
                resetCart();
            }
        })
    }
    return (

        <div className={style.overlay} onClick={() => { closeCart() }}>

            {checkOutIndex && <CheckOut />}
            <div onClick={(e) => { e.stopPropagation() }} id={style.content} className=' p-3 d-flex flex-column animate__animated animate__fadeInRight'>
                {
                    productsInCart.length > 0 ? ( <div className=' d-flex flex-column'>
                        <p>Your Cart</p>
                        <table className=' table table-light table-bordered '>
                            <thead>
                                <tr>
                                    <th>-</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productsInCart.map((el, index) => (
                                        <tr key={el.id}>
                                            <td className=' text-center align-middle'>{index + 1}</td>
                                            <td className=' text-center align-middle'>
                                                <div className=' d-flex align-items-center gap-2'>
                                                    <img src={el.img} alt="" />
                                                    <p className=' m-0'>{el.name}</p>
                                                </div>
                                            </td>
                                            <td className=' text-center align-middle'>{el.price}</td>
                                            <td className=' text-center align-middle'>
                                                <div className=' col-12 d-flex align-items-center justify-content-between gap-2 '>
                                                    <button onClick={() => (decrementQty(el.id))} className=' btn btn-danger'>-</button>
                                                    <p className=' m-0'>{el.qty}</p>
                                                    <button onClick={() => (incrementQty(el.id))} className=' btn btn-success'>+</button>
                                                </div>
                                            </td>
                                            <td className=' text-center align-middle'>$ {el.qty * el.price}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
    
                            <tfoot>
                                <tr>
                                    <td className=' bg-warning' colSpan={4}>Total</td>
                                    <td className=' bg-warning' colSpan={1}>{total}</td>
                                </tr>
                            </tfoot>
    
                        </table>
    
                        <div className=' d-flex align-items-center justify-content-between w-100 gap-2'>
                            <button onClick={handleReset} className=' btn btn-primary w-50'>Reset Cart</button>
                            <button onClick={openCheckOut} className=' btn btn-success w-50'>Check Out</button>
                        </div>
                    </div>): <p>There are no products in cart </p>

                    
                }
                
               

            </div>
        </div>
    )
}
