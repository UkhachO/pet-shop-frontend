import SectionTitle from "../../shared/components/SectionTitle/SectionTitle";
import ProductCard from "../../shared/components/ProductCard/ProductCard";
import products from "../../data/products";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  return (
    <main className={styles.page}>
      <SectionTitle title="All Products" />

      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </main>
  );
}
