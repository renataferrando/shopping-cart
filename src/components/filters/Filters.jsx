import React, { useState } from "react";
import Checkmark from "../checkmark/Checkmark";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProducts } from "../../redux/features/productSlice";
import "./_filters.scss";

const Filters = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoriesChecked, setCategoriesChecked] = useState([]);

  const { products } = useSelector((store) => store.products);

  const brands = products
    .map((item) => item.brand)
    .reduce((acc, br) => (acc.includes(br) ? acc : [...acc, br]), []);

  const genders = products
    .map((item) => item.gender)
    .reduce((acc, br) => (acc.includes(br) ? acc : [...acc, br]), []);

  const categories = products
    .map((item) => item.category)
    .reduce((acc, br) => (acc.includes(br) ? acc : [...acc, br]), []);

  const handlerFilter = (e) => {
    resetState();
    const { value, checked, name } = e.target;

    const currentCategoryChecked = value;
    const allCategoriesChecked = [...categoriesChecked];
    const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

    let updatedCategories;
    if (indexFound === -1) {
      searchParams.append(name, value);
      setSearchParams(searchParams);
      updatedCategories = [...categoriesChecked, currentCategoryChecked];
      setCategoriesChecked(updatedCategories);
    } else {
      searchParams.delete(name, value);
      setSearchParams(searchParams);
      updatedCategories = [...categoriesChecked];
      updatedCategories.splice(indexFound, 1);
      setCategoriesChecked(updatedCategories);
    }

    dispatch(getFilteredProducts(searchParams));
  };

  const resetState = () => {
    setCategoriesChecked([]);
  };
  return (
    <div className="filters">
      <h4>Filters</h4>
      <>
        <p>Gender</p>
        {genders.map((item) => (
          <Checkmark
            key={item}
            name="gender"
            label={item}
            value={item}
            onChange={handlerFilter}
            checked={categoriesChecked.includes(item)}
          />
        ))}
      </>
      <p>Brands</p>{" "}
      {brands.map((item) => (
        <Checkmark
          key={item}
          label={item}
          name="brand"
          value={item}
          checked={categoriesChecked.includes(item)}
          onChange={handlerFilter}
        />
      ))}
      <>
        <p>Category</p>
        {categories.map((item) => (
          <Checkmark
            key={item}
            label={item}
            name="category"
            value={item}
            checked={categoriesChecked.includes(item)}
            onChange={handlerFilter}
          />
        ))}
      </>
    </div>
  );
};

export default Filters;
