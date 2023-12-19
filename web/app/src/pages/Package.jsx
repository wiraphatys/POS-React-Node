import React, { useState, useEffect } from 'react'
import axios from "axios";
import config from '../config';

const Package = () => {
    const [packages, setPackages] = useState([]);

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
                                    <button className='btn btn-primary'>register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Package