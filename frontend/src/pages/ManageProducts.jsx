import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  IconButton,
  Stack,
  useToast,
  Divider,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/product";

const ManageProducts = () => {
  const { fetchProducts, products, createProduct, editProduct, deleteProduct } =
    useProductStore();
  const [editingProduct, setEditingProduct] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreateOrUpdate = async () => {
    if (editingProduct) {
      const { success, message } = await editProduct({
        ...formState,
        _id: editingProduct._id,
      });
      toast({
        title: success ? "Success" : "Error",
        description: message,
        status: success ? "success" : "error",
        duration: 5000,
        isClosable: true,
      });
      if (success) setEditingProduct(null);
    } else {
      const { success, message } = await createProduct(formState);
      toast({
        title: success ? "Success" : "Error",
        description: message,
        status: success ? "success" : "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setFormState({ name: "", price: "", image: "", description: "" });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormState({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
  };

  const handleDelete = async (id) => {
    console.log(id);
    const { success, message } = await deleteProduct(id);
    toast({
      title: success ? "Deleted" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xlg" py={10} alignItems={"center"}>
      <Heading
        as="h1"
        size="xl"
        mb={8}
        textAlign="center"
        bgGradient="linear(to-r, teal.400, blue.500)"
        bgClip="text"
      >
        Manage Products
      </Heading>

      {/* Form Section */}

      <Flex justify={"space-around"}>
        <Box w={"55%"}>
          {/* Products List Section */}
          <Heading as="h2" size="lg" mb={4}>
            All Products
          </Heading>
          <Stack spacing={4}>
            {products.map((product) => (
              <Flex
                key={product._id}
                p={4}
                bg="white"
                shadow="md"
                rounded="lg"
                align="center"
                justify="space-between"
                border="1px solid"
                borderColor="gray.200"
              >
                <Flex gap={4} align="center">
                  <Box
                    w="80px"
                    h="80px"
                    bgImage={`url(${product.image})`}
                    bgSize="cover"
                    bgPosition="center"
                    rounded="lg"
                    border="1px solid"
                    borderColor="gray.300"
                  ></Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">
                      {product.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      ${product.price}
                    </Text>
                    <Text fontSize="sm" mt={2} noOfLines={2} color="gray.600">
                      {product.description}
                    </Text>
                  </Box>
                </Flex>
                <HStack>
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit"
                    colorScheme="blue"
                    onClick={() => handleEdit(product)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete"
                    colorScheme="red"
                    onClick={() => handleDelete(product._id)}
                  />
                </HStack>
              </Flex>
            ))}
          </Stack>

          {/* Divider */}
          <Divider mt={8} />
        </Box>

        {/* ////////////////////////////////////////////////////////////////// */}
        <Box
          bg="white"
          p={8}
          w={"35%"}
          shadow="lg"
          rounded="lg"
          mb={8}
          border="1px solid"
          borderColor="gray.200"
          bgGradient="linear(to-br, gray.50, white)"
        >
          <Heading as="h2" size="md" mb={4}>
            {editingProduct ? "Edit Product" : "Create New Product"}
          </Heading>
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              focusBorderColor="blue.400"
            />
            <Input
              placeholder="Product Price"
              type="number"
              value={formState.price}
              onChange={(e) =>
                setFormState({ ...formState, price: e.target.value })
              }
              focusBorderColor="blue.400"
            />
            <Input
              placeholder="Product Image URL"
              value={formState.image}
              onChange={(e) =>
                setFormState({ ...formState, image: e.target.value })
              }
              focusBorderColor="blue.400"
            />
            <Textarea
              placeholder="Product Description"
              value={formState.description}
              onChange={(e) =>
                setFormState({ ...formState, description: e.target.value })
              }
              focusBorderColor="blue.400"
              resize="none"
            />
            <Button
              w="full"
              colorScheme="blue"
              onClick={handleCreateOrUpdate}
              _hover={{ bg: "blue.500" }}
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default ManageProducts;
