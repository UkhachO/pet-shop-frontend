import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../../shared/components/SectionTitle/SectionTitle";
import CategoryCard from "./CategoryCard/CategoryCard";
import { fetchCategories } from "../../redux/categoriesSlice";
import Breadcrumbs from "../../shared/components/Breadcrumbs/Breadcrumbs";
import styles from "./CategoriesPage.module.css";

export default function CategoriesPage() {
  const dispatch = useDispatch();

  const {
    list: categories,
    status,
    error,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <main className={styles.page}>
      <Breadcrumbs />
      <SectionTitle title="Categories" />

      {status === "loading" && <p>Загрузка...</p>}
      {status === "failed" && <p className={styles.error}>Ошибка: {error}</p>}

      {status === "succeeded" && (
        <div className={styles.grid}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      )}
    </main>
  );
}
