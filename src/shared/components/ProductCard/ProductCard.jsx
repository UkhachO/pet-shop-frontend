import styles from "./ProductCard.module.css";
export default function ProductCard({ name, price, image }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
    </div>
  );
}
