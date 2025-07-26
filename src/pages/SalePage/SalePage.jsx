import SectionTitle from "../../shared/components/SectionTitle/SectionTitle";
import ProductCard from "../../shared/components/ProductCard/ProductCard";
import products from "../../data/products"; 
import styles from "./SalePage.module.css";

export default function SalePage() {
  const saleProducts = products.filter((p) => p.discount);

  return (
    <main className={styles.page}>
      <SectionTitle
        title="Discounted Items"
        linkText="View all"
        linkTo="/products/all"
      />

      {saleProducts.length > 0 ? (
        <div className={styles.grid}>
          {saleProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Наразі немає товарів на розпродажі.</p>
      )}
    </main>
  );
}
