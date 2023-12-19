import React, { useState, useEffect } from 'react'
import axios from "axios";
import config from '../config';
import Modal from '../components/Modal';
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';

const Package = () => {
    const [packages, setPackages] = useState([]);
    const [yourPackage, setYourPackage] = useState({});
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            axios.get(config.api_path + "/packages/list").then(res => {
                setPackages(res.data.result);
            }).catch(err => {
                throw err.response.data;
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    const choosenPackage = (item) => {
        setYourPackage(item);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: "register confirmation",
                text: "please confirm register of the service",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true
            }).then(res => {
                if (res.isConfirmed) {
                    const payload = {
                        packageId: yourPackage.id,
                        name: name,
                        phone: phone
                    }
                    axios.post(config.api_path + "/package/memberRegister", payload).then(res => {
                        if (res.data.message === "success") {
                            Swal.fire({
                                title: "register successfully",
                                text: "We're already saved your register request.",
                                icon: "success",
                                timer: 2000
                            })
                            setName('');
                            setPhone('');
                        }
                    }).catch(err => {
                        throw err.response.data;
                    })
                }
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div>
            <div className="container mt-2">
                <div className="h1 text-primary my-4">YSR: POS ON CLOUD</div>
                <div className="h4 mb-3">Our Packages</div>
                <div className="row">
                    {packages.map(item =>
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className='h4 text-success mb-3'>{item.name}</div>
                                    <div className='h5'>{parseInt(item.bill_amount).toLocaleString()} bill/month</div>
                                    <div className='h5 text-secondary'>{parseInt(item.price).toLocaleString()} THB</div>
                                    <div className="mt-3">
                                        <button onClick={e => choosenPackage(item)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalRegister">register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal id="modalRegister" title="Service Registration">
                <form onSubmit={handleRegister}>
                    <div>
                        <label>Selected Package</label>
                        <div className='alert alert-info'>{yourPackage.name}: {yourPackage.price} THB/month</div>
                    </div>
                    <div>
                        <label>Shop/Restaurent Name</label>
                        <input onChange={e => setName(e.target.value)} value={name} type="text" className='form-control' />
                    </div>
                    <div className='mt-2'>
                        <label>Phone Number</label>
                        <input onChange={e => setPhone(e.target.value)} value={phone} type='text' className='form-control' />
                    </div>
                    <div className='mt-3'>
                        <button className='btn btn-success' onClick={handleRegister}>
                            confirm
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Package