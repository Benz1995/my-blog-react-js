import React, { useState } from 'react';
import Swal from 'sweetalert2';
import mainLogo from '../assets/logo-main.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
async function loginUser(credentials) {
    try {
        const response = await axios.post('http://localhost:1337/api/auth/local', {
            identifier: credentials.username,
            password: credentials.password,
        });
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        return response;
    } catch (error) {
        console.log('An error occurred:', error.response);
        return error.response;
    }
}

export default function Signin() {
    let statuLogin = localStorage.getItem('status');
    if(statuLogin == 1){
        window.location.href = "/dashboard";
    }
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    let selectedPicture = 'https://source.unsplash.com/random'
    let bgLogin = {
        bgStyle: {
          backgroundImage: `url(${selectedPicture})`,
          height: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }
      }
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
        console.log(response)
        if ('jwt' in response.data) {
            Swal.fire("Success", "เข้าสู่ระบบ", "success", {
                buttons: false,
                timer: 2000,
            })
            .then((value) => {
                localStorage.setItem('accessToken', response.data.jwt);
                localStorage.setItem('status', 1);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.href = "/dashboard";
            });
        } else {
            Swal.fire("Failed", "ตรวจสอบความผิดพลาดของข้อมูล", "error");
        }
    }

  return (
        <>         
            <section className="h-screen">
                <div className="h-full">
                    <div
                    className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-start">
                    <div className="mb-12 md:mb-0 md:w-6/12 lg:w-6/12 hidden sm:block" style={bgLogin.bgStyle}></div>
                    <div className="sm:w-full lg:w-6/12 m-auto p-10">
                        <img src={mainLogo} alt="Logo" className="w-6/12 m-auto"/>
                        <form onSubmit={handleSubmit}>
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <div className="mb-3 text-left"><label className="relative mb-6">ชื่อผู้ใช้งาน</label></div>
                            <input
                            type="text"
                            className="peer block min-h-[50px] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="user"
                            placeholder="User" 
                            onChange={e => setUserName(e.target.value)}/>
                        </div>

                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <div className="mb-3 text-left"><label className="mb-6">รหัสผ่าน</label></div>
                            <input
                            type="password"
                            className="peer block min-h-[50px] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="password"
                            placeholder="Password" 
                            onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <button
                            type="submit"
                            className="mb-10 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                           เข้าสู่ระบบ
                        </button>
                        <a href='/register'>
                            <button
                                type="button"
                                className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            ลงทะเบียน
                            </button>
                        </a>
                        </form>
                    </div>
                    </div>
                </div>
            </section>
        </>
  );
}