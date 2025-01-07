import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product-details/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
