import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "../types/product.types";
import { Button, InputNumber, Spin } from "antd";
import { Context } from "../context/context.provider";
import { CartItem } from "../types/cart.types";
import axiosInstance from "../api/axios";

export const ProductDetails = () => {
  const { id } = useParams(); 
  const { addToCart, updateCartQuantity, removeFromCart, cart } = Context();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number | null>(1);

  const handleQuantityChange = (value: number | null) => {
    if (value !== null && value !== quantity) {
      setQuantity(value);
      // Update the quantity in the cart as the quantity changes
      const cartItem = cart.items.find((item: CartItem) => item.product.id === product?.id);
      if (cartItem) {
        updateCartQuantity(product?.id, value);
      }
    }
  };

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id]);

  // Set the initial quantity if the product is already in the cart
  useEffect(() => {
    if (product && cart.items.length > 0) {
      const cartItem = cart.items.find((item: CartItem) => item.product.id === product.id);
      if (cartItem) {
        setQuantity(cartItem.quantity); 
      } else {
        setQuantity(1); 
      }
    }
  }, [product, cart.items]);

  if (!product) return (
    <div className="m-4">
      <Spin />
    </div>
  )

  // Check if the product is in the cart
  const cartItem = cart.items.find((item: CartItem) => item.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleRemoveFromCart = () => {
    if (cartItem) {
      removeFromCart(product.id);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={product.images[0] || "https://via.placeholder.com/500"}
              alt={product.title}
              className="w-full h-auto rounded-lg shadow-md mb-4"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => document.getElementById('mainImage')!.setAttribute('src', image)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-gray-500 line-through">
                  ${Math.round(
                    product.price + (product.price * product.discountPercentage) / 100
                  )}
                </span>
              )}
            </div>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`size-6 ${
                    index < Math.round(product.rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">{product.reviews.length} reviews</span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity Input */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity:
              </label>
              <InputNumber
                size="large"
                id="quantity"
                name="quantity"
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              {cartItem ? (
                <>
                  <Button
                    size="large"
                    onClick={handleRemoveFromCart}
                    className="bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Remove from Cart
                  </Button>
                </>
              ) : (
                <Button
                  size="large"
                  onClick={handleAddToCart}
                  className="bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add to Cart
                </Button>
              )}
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            </div>

            {/* Shipping and Return Information */}
            <div className="mt-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-2">Shipping Information:</h3>
              <p>{product.shippingInformation}</p>
            </div>
            <div className="mt-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-2">Return Policy:</h3>
              <p>{product.returnPolicy}</p>
            </div>

            {/* Warranty Information */}
            <div className="mt-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-2">Warranty:</h3>
              <p>{product.warrantyInformation}</p>
            </div>

            {/* Barcode and QR Code */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Barcode:</h3>
              <img
                src={`https://barcode.tec-it.com/barcode.ashx?data=${product.meta.barcode}&code=Code128`}
                alt="Product Barcode"
                className="w-48"
              />
              <h3 className="text-lg font-semibold mb-2 mt-4">QR Code:</h3>
              <img
                src={product.meta.qrCode || "https://via.placeholder.com/150"}
                alt="QR Code"
                className="w-48"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
