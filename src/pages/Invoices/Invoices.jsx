import { useState } from 'react'
import style from './Invoices.module.css'
import { useEffect } from 'react';
import moment from 'moment';
import { useCategoriesData, useInvoiceDetails } from '../../store';
import axios from 'axios';
import InvoiceDetails from '../../components/InvoiceDetails/InvoiceDetails';



export default function InvoicesPage() {
    const { index, openDetails, setActiveId } = useInvoiceDetails();
    const { domain } = useCategoriesData();
    const [invoices, setInvoices] = useState([]);
    const [ selectedDate , setSelectedDate ] = useState(
        moment().format('YYYY-MM-DD')
    );
    const getInvoice = () => {
        let url = domain + "/api/invoices";
        let userInfo = JSON.parse(sessionStorage.getItem("user Info"));

        axios.get(url,
            {
                params:
                {
                    populate: "*",
                    filters: {
                        $and: [
                            {invoice_date: {
                                $eq: selectedDate
                            }},
                            {pos_user:{
                                documentId:{
                                    $eq: userInfo.user_id
                                }
                            }}
                        ]
                        
                    }
                }
            }).then((res) => {
                if (res.data.data) {
                    setInvoices(res.data.data);

                } else {
                    setInvoices([]);
                }
            });
    }
    useEffect(() => {
        getInvoice();
    }, [selectedDate])


    const handleDataChange = (e) => {
        setSelectedDate(e.target.value);
    }

    return (
        <div id={style.InvoicesPage} className=' d-flex flex-column p-3'>
            {index && <InvoiceDetails />}
            <h3>Invoices</h3>
            <input type="date" onChange={handleDataChange} className=' form-control mb-3' max={moment().format().split('T')[0]} defaultValue={moment().format().split('T')[0]} />
            {
                invoices.length != 0 ? invoices.map((el, index) => (
                    <div key={el.documentId} onClick={() => { openDetails(), setActiveId(el.documentId) }} className=' col-12 col-md-6 col-lg-4 rounded border shadow p-3 bg-white d-flex align-items-center justify-content-between mb-2'>
                        <div className=' d-flex flex-column '>
                            <h4>Order # <span className=' text-danger'>{el.id}</span></h4>
                            <span>Done By {el.pos_user.user_name} </span>
                        </div>
                        <div className=' d-flex flex-column col-4 '>
                            <h4>Price : <span className=' text-success'>{el.invoice_total}</span> </h4>
                            <span>Time : {el.createdAt.slice(11, 16)} </span>
                        </div>
                    </div>
                )) : <h1>error</h1>
            }


        </div>
    )
}
