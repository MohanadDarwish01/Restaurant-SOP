import { useState } from 'react';
import { useCart } from '../../store';
import style from './CheckOut.module.css'

export default function CheckOut() {
    const { closeCheckOut , productsInCart } = useCart();

    const [ customerAmount , setCustomerAmount ] = useState(' ');
    const [ remain , setRemain ] = useState();


    const handleChange = (e) => {
        console.log(e.target.value)
        setCustomerAmount(e.target.value);
        setRemain( +e.target.value - getTotal());
    }


    const handleClose = (e) => {
        e.stopPropagation();
    }

    // const [total] = useState(0);
    const getTotal = () => {
        return (productsInCart.reduce((acc, el) => acc + (el.price * el.qty), 0));
       
    }

    return (
        <div id={style.CheckOut} className='' onClick={handleClose}>
            <div onClick={(e) => { e.stopPropagation() }} id={style.content} className=' bg-white col-10 col-md-6 col-lg-4 p-3 rounded mt-5 d-flex flex-column gap-3 shadow animate__animated animate__fadeInDown '>
                <p>Check out</p>
                <h3>Total is : $ {getTotal()}</h3>
                <h4>Customer amount is : </h4>
                <input value={customerAmount} onChange={handleChange} className=' form-control' type="number" placeholder='Enter Amount Here'/>
                <h4>Remain is : <span className={ remain < 0 ? "text-danger" : "text-success" }> {remain} </span> </h4>
                <button className=' btn btn-primary w-100' disabled={ remain < 0 ? true : false} >Save & Print</button>
            </div>
        </div>
    )
}
