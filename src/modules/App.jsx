import Navigation from "../pages/Navigation";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import "../shared/styles/style.css";

function App() {


  return (
    <>
      <Header />
      <div className=".container">
        <Navigation />
      </div>
      <Footer />
    </>
  );
}

export default App
