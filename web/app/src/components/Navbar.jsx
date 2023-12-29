import React, { useState } from 'react';
import config from '../config';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";
import axios from 'axios';

function Navbar({ updateSidebarMemberName }) {
    const [memberName, setMemberName] = useState('');

    const navigate = useNavigate();

    const handleSignOut = () => {
        Swal.fire({
            title: "Sign Out Confirmation",
            text: "Are you sure to sign out ?",
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                localStorage.removeItem(config.token_name);
                navigate("/login");
            }
        })
    }

    const handleEditProfile = async () => {
        try {
            const response = await axios.get(config.api_path + "/member/info", config.getHeaders());

            if (response.data.message === "success") {
                setMemberName(response.data.result.name);
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
            });
        }
    };

    const handleChangeProfile = async () => {
        try {
            const url = config.api_path + "/member/changeProfile";
            const token = localStorage.getItem(config.token_name);
            const headers = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            const payload = {
                memberName: memberName,
            }; 

            const response = await axios.put(url, payload, headers);

            if (response.data.message === "success") {

                updateSidebarMemberName(memberName);

                Swal.fire({
                    title: "Status",
                    icon: "success",
                    text: "Your data have been changed.",
                    timer: 2000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
            });
        }
    };


    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="index3.html" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Contact</a>
                    </li>
                </ul>

                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item mr-4'>
                        <button onClick={handleEditProfile} data-toggle="modal" data-target="#modalEditProfile"
                        className='btn btn-info mr-2'>
                            <i className='fa fa-user mr-2'></i>
                            Profile
                        </button>
                        <button onClick={handleSignOut} className='btn btn-danger'>
                            <i className='fa fa-times mr-2'></i>
                            Sign Out
                        </button>
                    </li>
                </ul>
            </nav>

            <Modal id="modalEditProfile" title="Edit Data">
                <div>
                    <label>Restaurent/Shop Name</label>
                    <input className='form-control' value={memberName} onChange={e => setMemberName(e.target.value)} />
                </div>
                <div>
                    <button className='btn btn-primary mt-4' onClick={handleChangeProfile} >
                        <i className='fa fa-check mr-2'></i>
                        Save
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default Navbar