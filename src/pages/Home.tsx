import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/product.types";
import axiosInstance from "../api/axios";
import { Spin } from "antd";
import { Context } from "../context/context.provider";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { selectedCategory, searchQuery, sortOption } = Context();

  useEffect(() => {
    // Determine the endpoint based on the search query and selected category
    let endpoint = `/products?select=title,price,category,rating,discountPercentage,thumbnail&sortBy=${sortOption}`;
    if (searchQuery) {
      endpoint = `/products/search?q=${searchQuery}&select=title,price,category,rating,discountPercentage,thumbnail&sortBy=${sortOption}`;
    } else if (selectedCategory !== "ALL CATEGORIES") {
      endpoint = `/products/category/${selectedCategory}?select=title,price,category,rating,discountPercentage,thumbnail&sortBy=${sortOption}`;
    }

    axiosInstance
      .get(endpoint)
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [selectedCategory, searchQuery, sortOption]);

  if (loading) {
    return (
      <div className="m-4">
        <Spin />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center p-4 ">
      <div className="flex justify-center gap-4 flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} /> // Rendering ProductCard for each product
        ))}
      </div>
    </div>
  );
};
