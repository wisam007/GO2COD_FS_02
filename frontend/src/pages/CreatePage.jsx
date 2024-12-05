import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Input,
  Button,
  useToast,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();
  const toast = useToast();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    success
      ? toast({
          title: "Product added successfully",
          description: message,
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      : toast({
          title: "Adding Product failed",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
      p={6}
    >
      <Container maxW={"md"}>
        <Box
          bgGradient="linear(to-br, teal.400, blue.500)"
          p={6}
          rounded="lg"
          shadow="lg"
          textAlign="center"
        >
          <Heading
            as={"h1"}
            size={"2xl"}
            color="white"
            textShadow="1px 1px #000"
            mb={6}
          >
            Create New Product
          </Heading>
          <Text color="whiteAlpha.800" mb={8}>
            Add your product details below and grow your store.
          </Text>
          <Box
            bg={useColorModeValue("white", "gray.700")}
            p={6}
            rounded="lg"
            shadow="lg"
          >
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                bg={useColorModeValue("gray.100", "gray.800")}
                _placeholder={{
                  color: useColorModeValue("gray.500", "gray.400"),
                }}
              />
              <Input
                placeholder="Product Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                bg={useColorModeValue("gray.100", "gray.800")}
                _placeholder={{
                  color: useColorModeValue("gray.500", "gray.400"),
                }}
              />
              <Input
                placeholder="Product Image URI"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                bg={useColorModeValue("gray.100", "gray.800")}
                _placeholder={{
                  color: useColorModeValue("gray.500", "gray.400"),
                }}
              />
              <Button
                w={"full"}
                colorScheme={"blue"}
                onClick={handleAddProduct}
                size="lg"
                _hover={{ bg: "blue.600" }}
              >
                Add Product
              </Button>
            </VStack>
          </Box>
        </Box>
      </Container>
    </Flex>
  );
};

export default CreatePage;
