// src/modules/Header/Header.jsx
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../../shared/components/icons/Logo"
import Basket from "../../shared/components/icons/Basket"

function Header() {
  return (
    <header className={styles.header}>
      {/* Логотип як компонент */}
      <div className={styles.logo}>
        <Link to="/">
          <Logo width={140} height={50} />
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products/all">All Products</Link>
        <Link to="/products/sale">Sale</Link>
      </nav>

      <div className={styles.cart}>
        <Link to="/cart">
          <Basket size={28} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
