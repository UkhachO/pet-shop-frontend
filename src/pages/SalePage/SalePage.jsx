import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../../shared/components/SectionTitle/SectionTitle";
import ProductCard from "../ProductPage/ProductCard/ProductCard";
import { fetchProducts } from "../../redux/productsSlice";
import styles from "./SalePage.module.css";

export default function SalePage() {
  const dispatch = useDispatch();
  const {
    list: products,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Фільтруємо по правильному полю discont_price
  const saleItems = products.filter((prod) => {
    // Перетворюємо рядки в числа, якщо потрібно
    const price = Number(prod.price);
    const salePrice = Number(prod.discont_price);
    // Беремо тільки ті, де salePrice > 0 і менше за звичайну ціну
    return salePrice > 0 && salePrice < price;
  });

  return (
    <main className={styles.page}>
      <SectionTitle
        title="Discounted Items"
        linkText="View all"
        linkTo="/products/all"
      />

      {status === "loading" && <p>Loading discounted items…</p>}
      {status === "failed" && <p className={styles.error}>Error: {error}</p>}

      {status === "succeeded" && saleItems.length > 0 ? (
        <div className={styles.grid}>
          {saleItems.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      ) : status === "succeeded" ? (
        <p className={styles.empty}>No discounted items available.</p>
      ) : null}
    </main>
  );
}
