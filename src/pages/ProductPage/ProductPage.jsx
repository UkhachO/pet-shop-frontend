import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/productsSlice";
import { addItem } from "../../redux/cart-slice";
import Button from "../../shared/components/Button/Button";
import Breadcrumbs from "../../shared/components/Breadcrumbs/Breadcrumbs";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    current: product,
    status,
    error,
  } = useSelector((state) => state.products);

  const [quantity, setQuantity] = useState(1);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (status === "loading" || !product) return <p>Loading…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const price = Number(product.price);
  const salePrice = Number(
    product.discount_price || product.salePrice || price
  );
  const hasDiscount = salePrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  // Теги категорій (якщо масив є)
  const tags = product.categories || product.tags || [];

  const desc = product.description || "";
  const shortDesc = desc.slice(0, 300);

  return (
    <main className={styles.page}>
      <Breadcrumbs />

      {/* ——— Теги ——— */}
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((t) => (
            <button key={t.id} className={styles.tag}>
              {t.name}
            </button>
          ))}
        </div>
      )}

      <div className={styles.wrapper}>
        {/* ——— Зображення ——— */}
        <div className={styles.imageWrap}>
          <img
            src={`${import.meta.env.VITE_API_URL}${product.image}`}
            alt={product.title || product.name}
            className={styles.image}
          />
        </div>

        {/* ——— Деталі ——— */}
        <div className={styles.details}>
          <h1 className={styles.title}>{product.title || product.name}</h1>

          <div className={styles.prices}>
            <span className={styles.current}>
              ${hasDiscount ? salePrice.toFixed(2) : price.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className={styles.old}>${price.toFixed(2)}</span>
                <span className={styles.badge}>-{discountPercent}%</span>
              </>
            )}
          </div>

          <div className={styles.controls}>
            <button
              className={styles.qtyBtn}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className={styles.qty}>{quantity}</span>
            <button
              className={styles.qtyBtn}
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>

            <Button
              variant="primary"
              onClick={() =>
                dispatch(
                  addItem({
                    id: product.id,
                    name: product.title || product.name,
                    price: salePrice,
                    image: product.image,
                    quantity,
                  })
                )
              }
              className={styles.addButton}
            >
              Add to cart
            </Button>
          </div>

          <div className={styles.description}>
            <h2>Description</h2>
            <p>
              {showFull ? desc : `${shortDesc}${desc.length > 300 ? "…" : ""}`}
            </p>
            {desc.length > 300 && (
              <button
                className={styles.readMore}
                onClick={() => setShowFull((v) => !v)}
              >
                {showFull ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
