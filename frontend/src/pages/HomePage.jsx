import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useCart } from "../store/cart";
import ProductCard from "../components/ProductCard";
const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const { addToCart } = useCart();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);

  const handleAddToCart = (e) => {
    console.log("Button Clicked");
    addToCart();
  };
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, blue.500, cyan.400)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Available Products
        </Text>
        {products.length == 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No products found 😥
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                {" "}
                Create Product
              </Text>
            </Link>
          </Text>
        )}

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard
              addToCart={handleAddToCart}
              key={product._id}
              product={product}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
