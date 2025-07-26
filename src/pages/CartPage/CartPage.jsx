import { useState, useEffect } from "react";
import Section from "../../shared/components/SectionTitle/SectionTitle";
import Button from "../../shared/components/Button/Button";
import styles from "./CartPage.module.css";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

export default function CartPage() {
  const [items, setItems] = useState(loadCart());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const handleRemove = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleClear = () => {
    setItems([]);
  };

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <main className={styles.page}>
      <Section title="Your Cart">
        {items.length === 0 ? (
          <p className={styles.empty}>Your cart is empty.</p>
        ) : (
          <div className={styles.list}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <img src={item.image} alt={item.name} />
                <div className={styles.info}>
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  <Button
                    variant="secondary"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className={styles.summary}>
              <p>
                Total: <strong>${total.toFixed(2)}</strong>
              </p>
              <Button variant="primary" onClick={handleClear}>
                Clear Cart
              </Button>
              <Button variant="primary" onClick={() => alert("Order placed!")}>
                Checkout
              </Button>
            </div>
          </div>
        )}
      </Section>
    </main>
  );
}
