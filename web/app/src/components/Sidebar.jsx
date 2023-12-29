import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom"

function Sidebar({ memberNames }) {
    const [memberName, setMemberName] = useState('');
    const [packageName, setPackageName] = useState('');

    useEffect(() => {
        fetchData();
    }, [memberNames])

    const fetchData = async () => {
        try {
            await axios.get(config.api_path + "/member/info", config.getHeaders()).then(res => {
                if (res.data.message === "success") {
                    setMemberName(res.data.result.name);
                    setPackageName(res.data.result.package.name);
                }
            }).catch(err => {
                throw err.response.data;
            })
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error"
            })
        }
    }
    return (
        <div>
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <a href="index3.html" class="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{opacity: "0.8"}} />
                        <span class="brand-text font-weight-light">POS on Cloud</span>
                </a>

                <div class="sidebar">
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div class="info text-white">
                            <div>{memberName}</div>
                            <div>package: {packageName}</div>
                        </div>
                    </div>

                    <div class="form-inline">
                        <div class="input-group" data-widget="sidebar-search">
                            <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div class="input-group-append">
                                    <button class="btn btn-sidebar">
                                        <i class="fas fa-search fa-fw"></i>
                                    </button>
                                </div>
                        </div>
                    </div>

                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li class="nav-item">
                                <a href="pages/widgets.html" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <Link to="/product" class="nav-link">
                                    <i class="nav-icon fas fa-box"></i>
                                    <p>
                                        Product
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar