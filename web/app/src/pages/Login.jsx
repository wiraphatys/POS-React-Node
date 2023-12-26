import axios from 'axios';
import React, { useState } from 'react';
import Swal from "sweetalert2";
import config from '../config';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const payload = {
                phone: phone,
                pass: pass
            }
            await axios.post(config.api_path + "/member/signin", payload).then(res => {
                if (res.data.message === "success") {
                    Swal.fire({
                        title: "Sign In",
                        text: "sign in successfully",
                        icon: "success",
                        timer: 2000
                    })

                    localStorage.setItem(config.token_name, res.data.token);

                    navigate("/home");

                } else {
                    Swal.fire({
                        title: "Sign In",
                        text: "not found username or password !",
                        icon: "warning",
                        timer: 2000
                    })
                }
            }).catch(err => {
                throw err.response.data;
            })
        } catch (e) {
            Swal.fire({
                title: 'error',
                icon: "error",
                text: e.message
            })
        }
    }
    return (
        <div>
            <div className="card container mt-5">
                <div className="card-header h3">
                    Login to POS
                </div>
                <div className='card-body'>
                    <div>
                        <label>Telephone</label>
                        <input onChange={e => setPhone(e.target.value)} className='form-control' />
                    </div>
                    <div className="mt-3">
                        <label>Password</label>
                        <input onChange={e => setPass(e.target.value)} type="password" className='form-control' />
                    </div>
                    <div className="my-3">
                        <button onClick={handleSignIn} className='btn btn-primary'>
                            <i className='fa fa-check' style={{ marginRight: "7px" }}></i>
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login