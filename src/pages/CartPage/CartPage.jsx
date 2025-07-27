import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "../../redux/cart-slice";
import SectionTitle from "../../shared/components/SectionTitle/SectionTitle";
import Button from "../../shared/components/Button/Button";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  // Групуємо товари за id
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.id]) acc[item.id] = { ...item, quantity: 0 };
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const entries = Object.values(grouped);

  // Загальна сума
  const total = entries.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Локальна форма для замовлення
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: axios.post("/order/send", { ...form, items })
    console.log("Order:", { ...form, items });
    dispatch(clearCart());
  };

  if (entries.length === 0) {
    return (
      <main className={styles.page}>
        <SectionTitle title="Your Cart" />
        <p className={styles.empty}>Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <SectionTitle title="Your Cart" />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {entries.map((item) => (
            <tr key={item.id}>
              <td className={styles.product}>
                <img
                  src={`${import.meta.env.VITE_API_URL}${item.image}`}
                  alt={item.name}
                  className={styles.img}
                />
                <span>{item.name}</span>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <button onClick={() => dispatch(removeItem(item.id))}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addItem(item))}>+</button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => dispatch(removeItem(item.id))}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer}>
        <p className={styles.total}>Total: ${total.toFixed(2)}</p>
        <button className={styles.clear} onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <Button type="submit">Place Order</Button>
      </form>
    </main>
  );
}
