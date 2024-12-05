import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Icon,
  Stack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProductDetailsPage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="lg">Product not found</Heading>
        <Button mt={4} onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="1200px" mx="auto" mt={8}>
      {/* Back to Home Button */}
      <Flex
        as="button"
        onClick={() => {
          navigate("/");
        }}
        alignItems="center"
        color="teal.500"
        mb={4}
        _hover={{ textDecoration: "underline" }} // Underline on hover
      >
        <Icon as={ArrowBackIcon} boxSize={4} mr={2} /> {/* Icon */}
        <Box>Back to Home</Box> {/* Text */}
      </Flex>

      {/* Product Details Container */}
      <Flex
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        bg={useColorModeValue("white", "gray.800")}
        direction={{ base: "column", md: "row" }}
      >
        {/* Product Image */}
        <Box flex="1">
          <Image
            src={product.image}
            alt={product.name}
            w="full"
            h="100%"
            maxH="500px"
            objectFit="cover"
          />
        </Box>

        {/* Product Info */}
        <Box flex="1" p={6}>
          <Heading as="h2" size="lg" mb={4}>
            {product.name}
          </Heading>
          <Text fontWeight="bold" fontSize="2xl" color="blue.500" mb={4}>
            ${product.price}
          </Text>
          <Text
            fontSize="md"
            color={useColorModeValue("gray.700", "gray.300")}
            mb={6}
          >
            {product.description}
          </Text>

          {/* Add to Cart Button */}
          <Button colorScheme="blue" leftIcon={<ArrowBackIcon />}>
            Add to Cart
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductDetailsPage;
