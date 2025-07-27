import React, { useState } from "react";
import styles from "./FirstOrderBanner.module.css";

// нові імпорти
import InputField from "../../../shared/components/InputField/InputField";
import Button from "../../../shared/components/Button/Button";
import animalsImage from "../../../assets/FirstOrderBanner.png"; 

export default function FirstOrderBanner() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: відправка на бекенд
    console.log("Subscribe form:", form);
    setSubmitted(true);
  };

  return (
    <div className={styles.banner}>
      <h2 className={styles.title}>5% off on the first order</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <InputField
          name="phone"
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Button  type="submit"
          disabled={submitted}
          className={submitted ? styles.submitted : styles.button}
        >
          {submitted ? "Request Submitted" : "Get a discount"}
        </Button>
      </form>

      {/* Картинка тварин */}
      <img className={styles.animalsImage} src={animalsImage} alt="" />
    </div>
  );
}
