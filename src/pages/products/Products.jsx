import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/productSlice";
import ProductsLayout from "../../components/productsLayout/ProductsLayout";
import Filters from "../../components/filters/Filters";
import ProductCard from "../../components/productCard/ProductCard";
import Loading from "../../components/loading/Loading";
import "./_products.scss";

const Products = ({ noResults }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, productsLoading } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="products-page">
      {productsLoading && <Loading />}
      <h1>Products</h1>
      <div className="wrapper">
        <Filters />
        <div className="products">
          <ProductsLayout>
            {productsLoading && <Loading />}
            {noResults && (
              <div>
                No results where found, try a diffrent search,{" "}
                <span className="go-back">go back</span>
              </div>
            )}
            {products.map((data) => (
              <ProductCard
                key={data._id}
                title={data.name}
                firstImage={data.firstImageUrl}
                secondImage={data.secondImageUrl}
                price={data.price}
                brand={data.brand}
                category={data.subcategory}
                onClick={() => navigate(`${data.id}`)}
              />
            ))}
          </ProductsLayout>
        </div>
      </div>
    </div>
  );
};
export default Products;
