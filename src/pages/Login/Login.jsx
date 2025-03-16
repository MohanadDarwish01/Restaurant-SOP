import { Link, useNavigate } from 'react-router-dom'
import style from './Login.module.css'
import { useRef } from 'react'
import { useCategoriesData } from '../../store';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function LoginPage() {
    const {domain} = useCategoriesData();
    const phone = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        let url = domain + "/api/pos-users";
        axios.get(url , {params : {
            filters : {
                $and:[
                    {user_phone :{
                        $eq : phone.current.value
                    }},
                    {user_password :{
                        $eq : password.current.value
                    }}
                ]
                

            }
        }
            
        }).then((res)=> {
            if(res.data.data.length == 1){
                let userInfo = res.data.data[0];
                let userDate = {
                    user_name : userInfo.user_name,
                    user_role : userInfo.user_role,
                    user_id : userInfo.documentId
                }
                sessionStorage.setItem("user Info" , JSON.stringify(userDate));
                Swal.fire({
                    icon: 'success',
                    text: 'Login Success',
                    timer: 1500,
                })
                navigate('/')
            }else{
                alert('wrong phone or password')
            }
            
        })

    }


  return (


    <div className={` col-12 h-100 d-flex align-items-center justify-content-center ${style.loginBg} `}>
            <form onSubmit={handleLogin} className={`rounded d-flex flex-column align-items-center gap-4 py-5 px-5 ${style.formDs}`}>
                <h2 className=' text-dark'>LogIn</h2>
                
            

                {/* form active inputs */}
                <input type="text" ref={phone}  placeholder='Enter your phone ' className={` w-100 form-control  ${style.inputDs}`} />
                <input type="password" ref={password}  placeholder='Enter your password' className={` w-100 form-control  ${style.inputDs}`} />




                <div className=' d-flex flex-column flex-md-row gap-3 gap-md-0 w-100 align-items-center justify-content-between'>
                    <Link
                         className="form-check">
                        <input className={`form-check-input border-dark ${style.checkDs} `} type="checkbox" value="" id="check1" />
                        <label className="form-check-label text-dark" htmlFor="check1">
                            Remember me
                        </label>
                    </Link>
                    <Link className={`${style.linkDs} `} to="*">Forgot password?</Link>

                </div>


                <button className={`${style.submitDs} btn w-100 `}> Submit</button>

                
            </form >
        </div >
  )
}
