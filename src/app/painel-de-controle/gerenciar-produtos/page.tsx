"use client";
import { api } from "@/axios/config";
import { FilterProductsComponent } from "@/components/filter-products";
import { TableProductsComponent } from "@/components/table-products";
import { useEffect, useState } from "react";

export default function Produtos() {
  const [categories, setCategories] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  async function getAllCategories() {
    try {
      const response = await api.get("/categories/list");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllProducts() {
    try {
      const response = await api.get("/products/list");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold">Meus Produtos</h1>
      <div className="pt-5 w-full">
        <FilterProductsComponent
          category={categories}
          setFilter={setFilteredProducts}
        />
      </div>
      <div className="pt-10">
        <TableProductsComponent
          products={products}
          filter={filteredProducts}
          getAllProducts={getAllProducts}
        />
      </div>
    </div>
  );
}
