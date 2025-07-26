import HeroBanner from "../../modules/HeroBanner/HeroBanner";
import Section from "../../shared/components/SectionTitle/SectionTitle";
import CategoryCard from "../../shared/components/CategoryCard/CategoryCard";
import ProductCard from "../../shared/components/ProductCard/ProductCard";
import Button from "../../shared/components/Button/Button";
import styles from "./HomePage.module.css";

const demoCategories = [
  { id: 1, name: "Dry & Wet Food", image: "/assets/cat1.jpg" },
  { id: 2, name: "Toys", image: "/assets/cat2.jpg" },
  { id: 3, name: "Beds", image: "/assets/cat3.jpg" },
  { id: 4, name: "Accessories", image: "/assets/cat4.jpg" },
];

const demoProducts = [
  { id: 1, name: "Dog Food", price: 12.99, image: "/assets/prod1.jpg" },
  { id: 2, name: "Cat Toy", price: 5.49, image: "/assets/prod2.jpg" },
  { id: 3, name: "Pet Bed", price: 29.99, image: "/assets/prod3.jpg" },
  { id: 4, name: "Leash", price: 9.99, image: "/assets/prod4.jpg" },
];

export default function HomePage() {

  return (
    <main className={styles.home}>
      <HeroBanner />

      <div className={styles.wrapper}>
        <Section title="Categories" linkText="View all" linkTo="/categories">
          {demoCategories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </Section>

        <Section title="5% off on first order">
          <form className={styles.promoForm}>
            <input type="text" placeholder="Name" />
            <input type="tel" placeholder="Phone" />
            <input type="email" placeholder="Email" />
            <Button variant="primary" >
              Get Discount
            </Button>
          </form>
        </Section>

        <Section
          title="Discounted Items"
          linkText="View all"
          linkTo="/products/sale"
        >
          {demoProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </Section>
      </div>
    </main>
  );
}
