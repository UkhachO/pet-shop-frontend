import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className={styles.link}>
        ← Back to Home
      </Link>
    </main>
  );
}
