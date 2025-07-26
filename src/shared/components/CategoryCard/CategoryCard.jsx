import styles from "./CategoryCard.module.css";

export default function CategoryCard({ name, image }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}
