// src/pages/CategoryPage/CategoryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategories, getProducts } from "../../api/api";
import ProductCard from "../ProductPage/ProductCard/ProductCard";
import Breadcrumbs from "../../shared/components/Breadcrumbs/Breadcrumbs";
import styles from "./CategoryPage.module.css";

export default function CategoryPage() {
  const { id } = useParams(); // id категорії з url /categories/:id
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // стани фільтрів
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    async function load() {
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        setCategories(Array.isArray(cats) ? cats : []);
        setProducts(Array.isArray(prods) ? prods : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  // Знаходимо назву поточної категорії
  const currentCat = categories.find((c) => String(c.id) === id);
  const catName = currentCat?.name || "";

  // Всі товари в цій категорії
  let filtered = products.filter((p) => String(p.categoryId) === id);

  // Фільтруємо за ціною
  if (priceFrom !== "") {
    filtered = filtered.filter((p) => p.price >= parseFloat(priceFrom));
  }
  if (priceTo !== "") {
    filtered = filtered.filter((p) => p.price <= parseFloat(priceTo));
  }

  // Лише зі знижкою
  if (discountedOnly) {
    filtered = filtered.filter(
      (p) => typeof p.discont_price === "number" && p.discont_price < p.price
    );
  }

  // Сортування
  if (sortOption === "price-asc") {
    filtered = filtered.slice().sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filtered = filtered.slice().sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    filtered = filtered
      .slice()
      .sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
  }

  return (
    <main className={styles.page}>
      <Breadcrumbs />

      <h1 className={styles.heading}>{catName}</h1>

      {/* Фільтри */}
      <div className={styles.filters}>
        <div className={styles.filterItem}>
          <label>Price: </label>
          <input
            type="number"
            placeholder="from"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="to"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.filterItem}>
          <label>
            <input
              type="checkbox"
              checked={discountedOnly}
              onChange={(e) => setDiscountedOnly(e.target.checked)}
            />{" "}
            Discounted items
          </label>
        </div>

        <div className={styles.filterItem}>
          <label>Sorted: </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.select}
          >
            <option value="default">by default</option>
            <option value="price-asc">price ↑</option>
            <option value="price-desc">price ↓</option>
            <option value="name-asc">name A→Z</option>
          </select>
        </div>
      </div>

      {/* Сітка продуктів */}
      {filtered.length > 0 ? (
        <div className={styles.productsGrid}>
          {filtered.map((prod) => (
            <ProductCard
              key={prod.id}
              id={prod.id}
              title={prod.title || prod.name}
              price={prod.price}
              image={prod.image || prod.imageUrl}
              discont_price={prod.discont_price}
              // onAddToCart – якщо потрібно
            />
          ))}
        </div>
      ) : (
        <p className={styles.noItems}>No products found.</p>
      )}
    </main>
  );
}
