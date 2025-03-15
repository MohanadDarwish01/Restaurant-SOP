import { useEffect, useState } from 'react';
import { useCategoriesData, useInvoiceDetails } from '../../store';
import style from './InvoiceDetails.module.css'
import axios from 'axios';
export default function InvoiceDetails() {

    const { closeDetails, activeInvoiceId } = useInvoiceDetails();
    const { domain } = useCategoriesData();

    const [details, setDetails] = useState();

    useEffect(() => {
        if (activeInvoiceId) {
            let url = domain + `/api/invoices/${activeInvoiceId}`
            axios.get(url, {
                params: {
                    populate: {
                        invoices_details: {
                            populate: {
                                product: {
                                    populate: "*"
                                }
                            }

                        }
                    }

                }
            }).then((res) => {
                setDetails(res.data.data);
            })
        }
    }, [])

    return (
        <div id={style.overLay} onClick={closeDetails} className=" overLay ">
            <div onClick={(e) => (e.stopPropagation())} className="content animate__animated animate__fadeInRight p-3">
                <table className=' table table-light table-bordered '>
                    <thead>
                        <tr className=' text-center'>
                            <th>-</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            details && details.invoices_details.map((el, index) => (
                                <tr key={el.documentId}>
                                    <td className=' text-center align-middle'>{index + 1}</td>
                                    <td className=' text-center align-middle'>
                                        <div className=' d-flex align-items-center gap-2'>
                                            <img src={domain + el.product.product_img.url} alt="" />
                                            <p className=' m-0'>{el.product.product_name}</p>
                                        </div>
                                    </td>
                                    <td className=' text-center align-middle'>{el.product.product_price}</td>
                                    <td className=' text-center align-middle'>{el.product_qty}</td>
                                    <td className=' text-center align-middle'>$ {el.product_qty * el.product.product_price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className=' bg-warning' colSpan={4}>Total</td>
                            <td className=' bg-warning' colSpan={1}>{details && details.invoice_total}</td>
                        </tr>
                    </tfoot>
                </table>


            </div>
        </div>
    )
}
