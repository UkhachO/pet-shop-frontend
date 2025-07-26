import SectionTitle from "../../shared/components/SectionTitle/SectionTitle";
import CategoryCard from "../../shared/components/CategoryCard/CategoryCard";
import categories from "../../data/categories";
import styles from "./CategoriesPage.module.css";

export default function CategoriesPage() {
  return (
    <main className={styles.page}>
      <SectionTitle title="Categories" />

      <div className={styles.grid}>
        {categories.map((cat) => (
          <CategoryCard key={cat.id} {...cat} />
        ))}
      </div>
    </main>
  );
}
