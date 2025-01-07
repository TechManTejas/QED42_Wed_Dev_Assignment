import { useNavigate } from "react-router-dom";
import { Context } from "../context/context.provider";
import { CartItem } from "../types/cart.types";

export const Cart = () => {

  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity } = Context();

  // Define delivery charges and tax rate
  const deliveryCharges = 5.99; // example delivery charge
  const taxRate = 0.05; // 10% tax rate

  // Calculate tax
  const tax = cart.totalAmount * taxRate;

  // Calculate total (total amount + tax + delivery charges)
  const totalAmountWithTaxAndDelivery = cart.totalAmount + tax + deliveryCharges;

  const handleDecrement = (productId: number) => {
    const item = cart.items.find(
      (item: CartItem) => item.product.id === productId
    );
    if (item && item.quantity > 1) {
      updateCartQuantity(productId, item.quantity - 1);
    }
  };

  const handleIncrement = (productId: number) => {
    const item = cart.items.find(
      (item: CartItem) => item.product.id === productId
    );
    if (item) {
      updateCartQuantity(productId, item.quantity + 1);
    }
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <section className="min-h-screen bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 ::text-white sm:text-2xl">
          Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {/* Render Cart Items */}
              {cart.items.length > 0 ? (
                cart.items.map((item: CartItem) => (
                  <div
                    key={item.product.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <div className="cursor-pointer shrink-0 md:order-1" onClick={()=>{ navigate(`/product-details/${item.product.id}`)}}>
                        <img
                          className="h-20 w-20"
                          src={item.product.thumbnail} // Assuming each product has an `imageUrl` field
                          alt={item.product.title}
                        />
                      </div>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleDecrement(item.product.id)}
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement(item.product.id)}
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900">
                            ${item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <div
                          className="hover:cursor-pointer text-base font-medium text-gray-900 hover:underline" onClick={()=>{ navigate(`/product-details/${item.product.id}`)}}
                        >
                          {item.product.title}
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleRemove(item.product.id)}
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900">
                Order summary
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${cart.totalAmount}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Delivery charges
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${deliveryCharges.toFixed(2)}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Tax (10%)
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${tax.toFixed(2)}
                    </dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">
                    ${totalAmountWithTaxAndDelivery.toFixed(2)}
                  </dd>
                </dl>
              </div>
              <div
                className="hover:cursor-pointer flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
              >
                Proceed to Checkout
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500">or</span>
                <div
                  onClick={() => {
                    navigate("/");
                  }}
                  className="hover:cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
