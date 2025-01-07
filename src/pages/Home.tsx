import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/product.types";
import axiosInstance from "../api/axios";
import { Spin } from "antd";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="m-4">
        <Spin />
      </div>
    )
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
