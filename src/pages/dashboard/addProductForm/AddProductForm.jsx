import React from "react";
import Button from "../../../components/button/Button";
import { useForm } from "react-hook-form";
import schema from "./createProductSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { createNewProducts } from "../../../redux/features/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import SuccessModal from "../../../components/successModal/SuccessModal";
import { resetPostState } from "../../../redux/features/adminSlice";
import "./_add-product-form.scss";

const AddProductForm = () => {
  const { status, error } = useSelector((store) => store.newProducts);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const name = data.name;
    const brand = data.brand;
    const price = data.price;
    const size = data.size;
    const category = data.category;
    const gender = data.gender;
    const countInStock = data.countInStock;
    const description = data.description;
    dispatch(
      createNewProducts({
        name,
        brand,
        price,
        size,
        category,
        gender,
        countInStock,
        description,
      })
    );
  };
  const handleResetForm = () => {
    dispatch(resetPostState("idle"));
    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Product Name</label>
      <input type="text" name="name" {...register("name")} />
      <p className="error-message">{errors.name?.message}</p>
      <label htmlFor="">Brand</label>
      <input type="text" name="brand" {...register("brand")} />
      <p className="error-message">{errors.brand?.message}</p>
      <label htmlFor="">Price</label>
      <input type="number" name="price" {...register("price")} />
      <p className="error-message">{errors.price?.message}</p>
      <label htmlFor="">Sizes</label>
      <input type="text" name="size" {...register("size")} />
      <p className="error-message">{errors.size?.message}</p>
      <label htmlFor="">Category</label>
      <input type="text" name="category" {...register("category")} />
      <p className="error-message">{errors.category?.message}</p>
      <label htmlFor="">Gender</label>
      <input type="text" name="gender" {...register("gender")} />
      <p className="error-message">{errors.gender?.message}</p>
      <label htmlFor="">Stock</label>
      <input type="number" name="countInStock" {...register("countInStock")} />
      <p className="error-message">{errors.countInStock?.message}</p>
      <label htmlFor="">Description</label>
      <input type="text" name="description" {...register("description")} />
      <p className="error-message">{errors.description?.message}</p>

      <Button label="Add" size="small" type="submit" />
      {status === "failed" && <p>Sorry, something went wrong: {error}</p>}
      {status === "succeeded" && (
        <SuccessModal
          title="Product added successfully!"
          text="Add another product or continue shopping"
          btnLabel="Ok"
          isOpen={true}
          onClose={handleResetForm}
          onClick={handleResetForm}
        />
      )}
    </form>
  );
};

export default AddProductForm;
