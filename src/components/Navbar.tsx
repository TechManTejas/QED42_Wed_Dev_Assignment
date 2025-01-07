import { Input, Radio, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Context } from "../context/context.provider";
import { useLocation, useNavigate } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);

  const {
    selectedCategory,
    setSelectedCategory,
    setSearchQuery,
    sortOption,
    setSortOption,
    cart,
  } = Context();

  useEffect(() => {
    axiosInstance
      .get("/products/category-list")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSortChange = (e: any) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      {/* main bar */}
      <header className="bg-white">
        <div className="container mx-auto px-4 py-2 flex items-center">
          {/* logo */}
          <div
            className="mr-auto md:w-48 flex-shrink-0"
            onClick={() => {
              navigate("/");
            }}
          >
            <img className="h-8 md:h-12" src="/funstore.png" alt="Logo" />
          </div>
          {/* search */}
          <div className="w-full max-w-sm xl:max-w-xl 2xl:max-w-3xl bg-gray-100 rounded-md hidden xl:flex items-center p-1">
            <Select
              value={selectedCategory}
              onChange={(value) => handleCategoryChange(value)}
              className="uppercase font-bold mr-1"
              style={{ width: 200 }}
            >
              <Option value="all categories">
                <div className="text-xs">All Categories</div>
              </Option>
              {categories.map((category) => (
                <Option key={category} value={category}>
                  <div className="text-xs">
                    {category.replace(/-/g, " ").toUpperCase()}
                  </div>
                </Option>
              ))}
            </Select>
            <Search
              placeholder="I'm searching for ..."
              allowClear
              onSearch={(value) => handleSearchChange(value)}
              style={{ flexGrow: 1 }} // Ensures the search input takes up available space
            />
          </div>
          {/* phone number */}
          <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
            <span className="font-bold md:text-xl">+91 766 667 4367</span>
            <span className="font-semibold text-sm text-gray-400">
              Support 24/7
            </span>
          </div>
          {/* buttons */}
          <nav className="contents">
            <ul className="ml-4 xl:w-48 flex items-center justify-end">
              <li className="ml-2 lg:ml-4 relative inline-block">
                <div onClick={()=> navigate("/cart")}>
                  <div className="absolute -top-1 right-0 z-10 bg-yellow-500 text-xs font-bold px-1 py-0.5 rounded-sm">
                    {cart.totalQuantity}
                  </div>
                  <svg
                    className="h-9 lg:h-10 p-2 text-gray-500"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="shopping-cart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </nav>
          {/* cart count */}
          <div className="ml-4 hidden sm:flex flex-col font-bold">
            <span className="text-xs text-gray-400">Your Cart</span>
            <span>${cart.totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <hr />
      </header>
      {/* category bar */}
      <div className="overflow-x-auto border-b py-2">
        <div className="flex space-x-4 px-4">
          {categories.map((category) => (
            <Tag
              key={category}
              color={selectedCategory === category ? "gold-inverse" : ""}
              className="cursor-pointer capitalize"
              onClick={() => handleCategoryChange(category)}
            >
              {category.replace(/-/g, " ")}
            </Tag>
          ))}
        </div>
      </div>
      {/* sort bar */}
      {location.pathname === "/" && (
        <div className="overflow-x-auto border-b p-2 flex items-center gap-2">
          <div className="text-sm font-bold">Sort By</div>
          <Radio.Group
            onChange={handleSortChange}
            value={sortOption}
            size="small"
          >
            <Radio.Button value="price-low-high">
              Price (Low to High)
            </Radio.Button>
            <Radio.Button value="price-high-low">
              Price (High to Low)
            </Radio.Button>
            <Radio.Button value="rating-high-low">
              Rating (High to Low)
            </Radio.Button>
          </Radio.Group>
        </div>
      )}
    </>
  );
};
