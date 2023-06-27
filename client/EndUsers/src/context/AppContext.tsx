import React, { ReactNode, useContext, useState } from "react";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Auth/ErrorCon";
import { Cart } from "../components/Cart/CartRowItem";

export type InnerSubCategory = {
  id: string;
  name: string;
  categoryId: string;
  subCategoryId: string;
};

export type SubCategory = {
  id: string;
  name: string;
  categoryId: string;
};

export type Categories = {
  id: string;
  name: string;
  categoryId: string;
};

/* type Brand = {
  id: string;
  logo: string;
  name: string;
};

type Vendors = {
  id: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  storeName: string;
  vendorName: string;
};
 */
/* type ProductImg = {
  id: string;
  link: string;
}; */

export type ProductVariationsInfo = {
  id: string;
  name: string;
  discountedPrice: string;
  price: string;
};

type ProductVariations = {
  attribute: string;
  info: ProductVariationsInfo[];
};

type ProductShipping = {
  isFree: Boolean;
  charge: null | number;
};

type ProductTax = {
  inPercent: Boolean;
  vat: number;
};

type ProductPricing = {
  oldPrice: string;
  discountedPrice: string;
};

export type ProductType = {
  id: string;
  vendorId: string;
  name: string;
  pricing: ProductPricing;
  img: string;
  tax: null | ProductTax;
  category: string;
  subCategory: string;
  innerSubCategory: string;
  brandName: string;
  sku: string;
  tags: string[];
  variations: ProductVariations;
  shipping: ProductShipping;
  return: Boolean;
  featured: Boolean;
  hotDeals: Boolean;
  shippingTime: number;
  description: string;
};

type AllCategories = {
  category: Categories[];
  subCategory: SubCategory[];
  innerSubCategory: InnerSubCategory[];
};

type Value = {
  userData: AllCategories;
  makeReq: number;
  setMakeReq: Function;
  cartItems: Cart[];
  subTotal: number;
  setSubTotal: Function;
  totalTax: number;
  setTotalTax: Function;
  totalShipping: number;
  setTotalShipping: Function;
  totalDiscount: number;
  setTotalDiscount: Function;
  grandTotal: number;
};

const AppProvider = React.createContext<Value>(null!);

export function useApp() {
  return useContext(AppProvider);
}

export default function AppContext({ children }: { children: ReactNode }) {
  const [makeReq, setMakeReq] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalShipping, setTotalShipping] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const grandTotal = subTotal + totalTax + totalShipping - totalDiscount;

  const { userData, loading, error } = useGetReq(
    "/category/get-all-categories",
    {}
  );

  const {
    loading: cartLoading,
    error: cartErr,
    userData: cartItems,
  } = useGetReq("/products/get-cart", { makeReq });

  const value: Value = {
    userData,
    makeReq,
    cartItems,
    setMakeReq,
    subTotal,
    setSubTotal,
    totalTax,
    setTotalTax,
    totalShipping,
    setTotalShipping,
    totalDiscount,
    setTotalDiscount,
    grandTotal,
  };

  return (
    <AppProvider.Provider value={value}>
      <ErrorCon error={error} />
      <ErrorCon error={cartErr} />
      {!loading && !cartLoading && userData ? children : "loading..."}
    </AppProvider.Provider>
  );
}
