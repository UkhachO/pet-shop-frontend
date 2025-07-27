// src/pages/ProductsPage/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../../shared/components/SectionTitle/SectionTitle";
import ProductCard from "../ProductPage/ProductCard/ProductCard";
import Pagination from "../../shared/components/Pagination/Pagination";
import { fetchProducts } from "../../redux/productsSlice";
import Breadcrumbs from "../../shared/components/Breadcrumbs/Breadcrumbs";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const {
    list: products,
    status,
    error,
  } = useSelector((state) => state.products);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginated = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className={styles.page}>
      <Breadcrumbs />
      <SectionTitle title="All Products" />

      {status === "loading" && <p>Loading products…</p>}
      {status === "failed" && <p className={styles.error}>Error: {error}</p>}

      {status === "succeeded" && (
        <>
          <div className={styles.grid}>
            {paginated.map((prod) => (
              <ProductCard key={prod.id} {...prod} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </main>
  );
}
