import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (status === "loading" || !product) return <p>Loading…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const price = Number(product.price);
  const salePrice = Number(
    product.discount_price || product.salePrice || price
  );

  return (
    <main className={styles.page}>
      <Breadcrumbs />
      <img
        src={`${import.meta.env.VITE_API_URL}${product.image}`}
        alt={product.title || product.name}
        className={styles.image}
      />

      <div className={styles.details}>
        <h1 className={styles.title}>{product.title || product.name}</h1>
        {salePrice < price ? (
          <p className={styles.prices}>
            <span className={styles.old}>${price.toFixed(2)}</span>
            <span className={styles.new}>${salePrice.toFixed(2)}</span>
          </p>
        ) : (
          <p className={styles.price}>${price.toFixed(2)}</p>
        )}

        <p className={styles.desc}>{product.description}</p>

        <Button
          variant="primary"
          onClick={() =>
            dispatch(
              addItem({
                id: product.id,
                name: product.title || product.name,
                price: salePrice,
                image: product.image,
              })
            )
          }
        >
          Add to Cart
        </Button>
      </div>
    </main>
  );
}
