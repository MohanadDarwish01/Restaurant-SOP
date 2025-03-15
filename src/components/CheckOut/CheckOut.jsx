import { useState } from 'react';
import { useCart, useCategoriesData } from '../../store';
import style from './CheckOut.module.css'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CheckOut() {
    const { closeCheckOut, productsInCart, resetCart, closeCart } = useCart();
    const { domain } = useCategoriesData()
    const [customerAmount, setCustomerAmount] = useState(' ');
    const [remain, setRemain] = useState();


    const handleChange = (e) => {
        setCustomerAmount(e.target.value);
        setRemain(+e.target.value - getTotal());
    }


    const handleClose = (e) => {
        e.stopPropagation();
    }

    const getTotal = () => {
        return (productsInCart.reduce((acc, el) => acc + (el.price * el.qty), 0));

    }




    const createNewInvoice = (total) => {
        let endPoint = "/api/invoices";
        let data = {
            invoice_total: total,
            pos_user: {
                connect: ['jcegzptjimh1id3a093u8k5h'],
            }
        }

        let url = domain + endPoint;
        axios.post(url,
            { data: data }
        ).then((res) => {
            let invoiceId = res.data.data.documentId;
            createRecords(invoiceId);
        }).catch((err) => {
            console.log(err);
        })
    }



    const createRecords = (invoiceId) => {
        productsInCart.forEach((el) => {
            let url = domain + "/api/invoices-details"
            let data = {
                product_qty: el.qty,
                invoice: {
                    connect: [invoiceId]
                },
                product: {
                    connect: [el.id]
                }
            };
            axios.post(url, { data: data }).then(() => {
                console.log('Record Saved to DB');
            })

        });

        Swal.fire({
            icon: 'success',
            title: 'Invoice Successfully Saved !',
            timer: 1500,
        }).then(() => {
            closeCheckOut();
            resetCart();
            closeCart();
        })
    }

    const handleSaveInvoice = () => {
        let fTotal = getTotal();
        createNewInvoice(fTotal);
    }



    return (
        <div id={style.CheckOut} className='' onClick={handleClose}>
            <div onClick={(e) => { e.stopPropagation() }} id={style.content} className=' bg-white col-10 col-md-6 col-lg-4 p-3 rounded mt-5 d-flex flex-column gap-3 shadow animate__animated animate__fadeInDown '>
                <p>Check out</p>
                <h3>Total is : $ {getTotal()}</h3>
                <h4>Customer amount is : </h4>
                <input value={customerAmount} onChange={handleChange} className=' form-control' type="number" placeholder='Enter Amount Here' />
                <h4>Remain is : <span className={remain < 0 ? "text-danger" : "text-success"}> {remain} </span> </h4>
                <button onClick={handleSaveInvoice} className=' btn btn-primary w-100' disabled={remain < 0 ? true : false} >Save & Print</button>
            </div>
        </div>
    )
}
