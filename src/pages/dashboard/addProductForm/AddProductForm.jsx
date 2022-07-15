import React, { useState } from "react";
import Button from "../../../components/button/Button";
import { useForm } from "react-hook-form";
import schema from "./createProductSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "./_add-product-form.scss";
const AddProductForm = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const id = data.id;
    const name = data.name;
    const brand = data.brand;
    const price = data.price;
    const size = data.size;
    const category = data.category;
    const gender = data.gender;
    const countInStock = data.countInStock;
    const description = data.description;

    await axios
      .post("http://localhost:3001/products", {
        id,
        name,
        brand,
        price,
        size,
        category,
        gender,
        countInStock,
        description,
      })
      .then((response) => {
        console.log(response);
        setSuccess(true);
      })
      .catch((error) => setError(error.message), console.log(error));
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Product Name</label>
      <input type="text" name="name" {...register("name")} />
      <p className="error-message">{errors.name?.message}</p>
      <label htmlFor="">Id</label>
      <input type="text" name="id" {...register("id")} />
      <p className="error-message">{errors.id?.message}</p>
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
      {error && <p>Sorry, something went wrong: {error}</p>}
      {success && <p>Succeded! Product was succesfully added</p>}
    </form>
  );
};

export default AddProductForm;
