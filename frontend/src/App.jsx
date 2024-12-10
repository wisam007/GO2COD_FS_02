import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ManageProducts from "./pages/ManageProducts";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.800")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage isAdmin={false} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/create" element={<CreatePage />} />
        <Route path="/:id" element={<ProductDetailsPage />} />
        <Route path="/admin" element={<LoginPage isAdmin={true} />} />
        <Route path="/manage" element={<ManageProducts />} />
      </Routes>
    </Box>
  );
}

export default App;
