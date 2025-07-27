// src/shared/components/Breadcrumbs/Breadcrumbs.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

const nameMap = {
  products: "All Products",
  categories: "Categories",
  sale: "Sale",
  cart: "Cart",
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  // розбиваємо шлях на сегменти
  let parts = pathname.split("/").filter(Boolean);

  // якщо ми на "/products/all", інтерпретуємо як "/products"
  if (parts[0] === "products" && parts[1] === "all") {
    parts = ["products"];
  }

  // будуємо масив об'єктів { name, to }
  const crumbs = parts.map((part, idx) => {
    const name = nameMap[part] || part.charAt(0).toUpperCase() + part.slice(1);
    let to;
    // для products ведемо на /products/all
    if (part === "products") {
      to = "/products/all";
    } else {
      to = "/" + parts.slice(0, idx + 1).join("/");
    }
    return { name, to };
  });

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">Home</Link>
      {crumbs.map((c, i) => (
        <React.Fragment key={c.to}>
          <span className={styles.sep}>/</span>
          <Link to={c.to}>{c.name}</Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
