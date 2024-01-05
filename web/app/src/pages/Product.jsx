import React from 'react'
import Template from '../components/Template'
import Swal from "sweetalert2";
import axios from 'axios';
import config from '../config';
import { useState, useEffect } from 'react';
import Modal from '../components/Modal';

function Product() {
  const [product, setProduct] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [productImage, setProductImage] = useState({});
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios.get(config.api_path + "/product/list", config.getHeaders()).then(res => {
        if (res.data.message === "success") {
          setAllProducts(res.data.result);
        }
      })
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error"
      })
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      let url = config.api_path + "/product/insert";

      if (product.id !== undefined) {
        url = config.api_path + "/product/update";
      }
      await axios.post(url, product, config.getHeaders()).then(res => {
        if (res.data.message === "success") {
          Swal.fire({
            title: "Save",
            icon: "success",
            text: "saved data successfully.",
            timer: 2000
          })
        }

        setProduct({
          barcode: '',
          name: '',
          detail: '',
          price: '',
          cost: '',
          detail: ''
        });

        fetchData();
        handleClose();

      })
    } catch (e) {
      Swal.fire({
        title: "error",
        icon: "error",
        text: e.message
      })
    }
  }

  const handleClose = () => {
    const btns = document.getElementsByClassName("btnClose");
    for (let i = 0; i < btns.length; ++i) {
      btns[i].click();
    }
  }

  const handleDelete = (item) => {
    Swal.fire({
      title: "Delete Confirmation",
      text: "Are you sure to delete this item?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const response = await axios.delete(
            `${config.api_path}/product/delete/${item.id}`,
            config.getHeaders()
          );

          if (response.data.message === "success") {
            fetchData();
            Swal.fire({
              title: "Deleted Data",
              text: "Deleted data successfully.",
              timer: 2000,
              icon: "success",
            });
          } else {
            throw new Error("Failed to delete data");
          }
        } catch (e) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: e.message || "Failed to delete data",
          });
        }
      }
    });
  };

  const handleChangeFile = (files) => {
    setProductImage(files[0]);
  }

  const handleUpload = async () => {
    try {
      console.log(config.token_name);
      const _config = {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem(config.token_name),
          "Content-Type": "multipart/form-data"
        }
      };

      const formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productImageName", productImage.name);
      formData.append("productId", product.id);

      axios.post(config.api_path + "/productImage/insert", formData, _config).then(res => {
        if (res.data.message === "success") {
          Swal.fire({
            title: "Image Uploaded",
            text: "uploaded image successfully.",
            timer: 2000,
            icon: 'success'
          })

          fetchDataProductImage();

          handleClose();
        }
      })

    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error"
      })
    }
  }

  const fetchDataProductImage = async () => {

  }


  return (
    <div>
      <Template>
        <div className="card container">
          <div className="card-header">
            <div className="card-title h4">Product</div>
          </div>
          <div className="card-body">
            <button className='btn btn-primary' data-toggle="modal" data-target="#modalProduct" >
              <i className='fa fa-plus mr-2'></i>
              Add
            </button>

            <table className='mt-3 table table-bordered table-striped'>
              <thead>
                <tr>
                  <th>Barcode</th>
                  <th>Product Name</th>
                  <th className='text-right'>Selling Price</th>
                  <th className='text-right'>Cost Price</th>
                  <th>Description</th>
                  <th width="200px"></th>
                </tr>
              </thead>
              <tbody>
                {allProducts.length > 0 ? allProducts.map(item =>
                  <tr>
                    <td>{item.barcode}</td>
                    <td>{item.name}</td>
                    <td className='text-right'>{parseFloat(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className='text-right'>{parseFloat(item.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>{item.detail}</td>
                    <td>
                      <button 
                        onClick={e => setProduct(item)}
                        data-toggle="modal"
                        data-target="#modalProductImage"
                        className='btn btn-primary ml-3'>
                        <i className='fa fa-images'></i>
                      </button>
                      <button onClick={e => setProduct(item)}
                        data-toggle="modal"
                        data-target="#modalProduct"
                        className='btn btn-secondary mx-2'>
                        <i className='fa fa-pencil-alt'></i>
                      </button>
                      <button onClick={e => handleDelete(item)} className='btn btn-danger'>
                        <i className='fa fa-times'></i>
                      </button>
                    </td>
                  </tr>
                ) : ''}
              </tbody>
            </table>
          </div>
        </div>
      </Template>

      <Modal id="modalProduct" title="Add New Product" modalSize="modal-lg">
        <form onSubmit={handleSave}>
          <div className="row">
            <div className="mt-3 col-3">
              <label>Barcord</label>
              <input value={product.barcode} onChange={e => setProduct({ ...product, barcode: e.target.value })} className='form-control' />
            </div>
            <div className="mt-3 col-9">
              <label>Product Name</label>
              <input value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} className='form-control' />
            </div>
          </div>
          <div className="row">
            <div className="mt-3 col-3">
              <label>Selling Price</label>
              <input value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} className='form-control' />
            </div>
            <div className="mt-3 col-3">
              <label>Cost Price</label>
              <input value={product.cost} onChange={e => setProduct({ ...product, cost: e.target.value })} className='form-control' />
            </div>
            <div className="mt-3 col-6">
              <label>Description</label>
              <input value={product.detail} onChange={e => setProduct({ ...product, detail: e.target.value })} className='form-control' />
            </div>
          </div>
          <div className="mt-4">
            <button type='submit' onClick={handleSave} className='btn btn-primary'>
              <i className='fa fa-check mr-2'></i>
              Save
            </button>
          </div>
        </form>
      </Modal>

      <Modal id="modalProductImage" title="Product Image" modalSize="modal-lg">

        <div className="row mt-2">
          <div className="col-4">
            <div className="input-group">
              <div className="input-group-text">Barcode</div>
              <input value={product.barcode} disabled className='form-control' />
            </div>
          </div>
          <div className="col-8">
            <div className="input-group">
              <div className="input-group-text">Name</div>
              <input value={product.name} disabled className='form-control' />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <div className="input-group">
              <div className="input-group-text">Description</div>
              <input value={product.detail} disabled className='form-control' />
            </div>
          </div>
        </div>
        
        <div className="row mt-3">
          <div className="col-12">
            <input onChange={e => handleChangeFile(e.target.files)} type='file' name='imageName' className='form-control' />
          </div>
        </div>

        <div className='mt-3'>
          { productImage.name !== undefined ?
          <button onClick={handleUpload} className='btn btn-primary'>
            <i className='fa fa-check mr-2'></i>
            Upload
          </button>
          : ''}
        </div>
      </Modal>
    </div>
  )
}

export default Product