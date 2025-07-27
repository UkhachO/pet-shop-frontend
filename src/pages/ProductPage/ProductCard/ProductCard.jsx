import styles from "./ProductCard.module.css";

export default function ProductCard({name, price, image }) {
  const BASE = import.meta.env.VITE_API_URL;
  const src = `${BASE}${image}`; 

  return (
    <div className={styles.card}>
      <img src={src} alt={name} className={styles.img} />
      <h4 className={styles.title}>{name}</h4>
      <p className={styles.price}>${price.toFixed(2)}</p>
    </div>
  );
}
