// src/shared/components/Breadcrumbs/Breadcrumbs.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCategories } from "../../../api/api";
import styles from "./Breadcrumbs.module.css";

const nameMap = {
  products: "All Products",
  categories: "Categories",
  sale: "All Sales",
  cart: "Cart",
};

function capitalizeSegment(seg) {
  return seg
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  let parts = pathname.split("/").filter(Boolean);

  // Якщо /products/all — показуємо тільки “products”
  if (parts[0] === "products" && parts[1] === "all") {
    parts = ["products"];
  }

  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((data) => {
        if (Array.isArray(data)) {
          const map = {};
          data.forEach((c) => {
            // зберігаємо під числовим id
            map[String(c.id)] = c.title;
            // якщо є slug — зберігаємо і під ним
            if (c.slug) {
              map[c.slug] = c.title;
            }
          });
          setCategoryMap(map);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const crumbs = [{ name: "Main page", to: "/" }];

  parts.forEach((part, idx) => {
    let label;

    if (parts[idx - 1] === "categories") {
      // для категорій шукаємо в мапі під будь-яким ключем
      label = loading
        ? "Loading..."
        : categoryMap[part] || capitalizeSegment(part);
    } else {
      label = nameMap[part] || capitalizeSegment(part);
    }

    const to =
      part === "products"
        ? "/products/all"
        : "/" + parts.slice(0, idx + 1).join("/");

    crumbs.push({ name: label, to });
  });

  return (
    <nav className={styles.breadcrumbs}>
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <React.Fragment key={crumb.to}>
            <Link
              to={crumb.to}
              className={`${styles.crumb} ${isLast ? styles.current : ""}`}
            >
              {crumb.name}
            </Link>
            {!isLast && <span className={styles.sep} />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
