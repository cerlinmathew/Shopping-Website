import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";



export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:title" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>  
  );
}
