import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/products";
import Button from "../../shared/components/Button/Button";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <p className={styles.notFound}>Товар не знайдено.</p>;
  }

  const handleAddToCart = () => {
   
    console.log("Add to cart:", product);
  };

  return (
    <main className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <div className={styles.container}>
        <img src={product.image} alt={product.name} className={styles.image} />

        <div className={styles.details}>
          <h2 className={styles.title}>{product.name}</h2>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.desc}>{product.description}</p>
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </main>
  );
}
