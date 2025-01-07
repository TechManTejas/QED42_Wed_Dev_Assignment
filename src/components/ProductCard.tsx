import { useNavigate } from "react-router-dom";
import { Product } from "../types/product.types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product-details/${product.id}`);
  };

  return (
    <div
      className="hover:cursor-pointer relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg bg-white shadow h-min"
      onClick={handleCardClick}
    >
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="object-cover"
          src={product.thumbnail}
          alt="product image"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {product.discountPercentage.toFixed(0)}% OFF
          </span>
        )}
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl tracking-tight text-slate-900">
          {product.title} {/* Dynamically set the product title */}
        </h5>
        <p className="mt-1 text-sm text-slate-500">{product.category}</p>{" "}
        {/* Dynamically set the product category */}
        <div className="mt-2 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              ${product.price.toFixed(2)}{" "}
              {/* Dynamically set the product price */}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-slate-900 line-through">
                $
                {(
                  product.price *
                  (1 + product.discountPercentage / 100)
                ).toFixed(2)}{" "}
                {/* Dynamically calculate and show the original price */}
              </span>
            )}
          </p>
          <div className="flex items-center">
            {/* Render the stars based on the rating */}
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                aria-hidden="true"
                className={`h-5 w-5 ${
                  index < Math.floor(product.rating)
                    ? "text-yellow-300"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              {product.rating} {/* Dynamically set the product rating */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
