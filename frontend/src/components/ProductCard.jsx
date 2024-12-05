import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ProductCardList = ({ product }) => {
  const params = useParams();

  return (
    <Box
      h={"500px"}
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      bg={useColorModeValue("white", "gray.800")}
      transition="transform 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      {/* Product Image */}
      <Image
        maxH={"50%"}
        w="full"
        objectFit="cover"
        src={product.image}
        alt={product.name}
      />

      {/* Product Details */}
      <Box p={4}>
        <Heading as="h3" size={"md"} mb={2} isTruncated>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={"blue.500"} mb={2}>
          ${product.price}
        </Text>
        <Text
          fontSize={"sm"}
          color={useColorModeValue("gray.600", "gray.300")}
          mb={4}
          noOfLines={3}
        >
          {product.description
            ? product.description.split(" ").slice(0, 25).join(" ") + "..."
            : ""}
        </Text>

        {/* Actions */}
        <Stack direction="row" spacing={4}>
          <Button
            as="a"
            href={`/${product._id}`}
            colorScheme="teal"
            variant="outline"
            size="sm"
          >
            View Details
          </Button>
          <Button colorScheme="blue" leftIcon={<FaShoppingCart />} size="sm">
            Add to Cart
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductCardList;
