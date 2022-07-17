import axios from "axios";
import React, { useState } from "react";
import Button from "../../components/button/Button";
import AddProductForm from "./addProductForm/AddProductForm";
import SuccessModal from "../../components/successModal/SuccessModal";
import "./_dashboard.scss";

const Dashboard = () => {
  const [createProduct, setCreateProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deletedSuccess, setDeletedSuccess] = useState(false);

  const handleOpenCreate = () => {
    setDeleteProduct(false);
    setCreateProduct(!createProduct);
  };

  const handleOpenDelete = () => {
    setCreateProduct(false);
    setDeleteProduct(!deleteProduct);
  };

  const handleDeleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:3001/products/${id}`)
      .then((response) => console.log(response), setDeletedSuccess(true))
      .catch((error) => console.log(error));
  };

  return (
    <div className="dashboard-wrapper">
      <div className="options">
        <p onClick={handleOpenCreate}>Create Product +</p>
        <p onClick={handleOpenDelete}>Delete Product +</p>
      </div>
      {createProduct && !deleteProduct && <AddProductForm />}
      {!createProduct && deleteProduct && (
        <div className="delete-product">
          <label htmlFor="">Product Id</label>
          <input
            type="text"
            onChange={(e) => {
              setDeleteId(e.target.value);
            }}
          />
          <Button
            size="small"
            label="Delete"
            onClick={() => handleDeleteProduct(deleteId)}
          />
        </div>
      )}
      {deletedSuccess && (
        <SuccessModal
          title="Product deleted successfully!"
          btnLabel="Ok"
          isOpen={true}
          onClose={() => {
            setDeletedSuccess(false);
          }}
          onClick={() => {
            setDeletedSuccess(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
