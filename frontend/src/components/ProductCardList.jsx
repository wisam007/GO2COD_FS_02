import {
  Box,
  Image,
  Heading,
  Text,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const ProductCardList = () => {
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transform={"a;; o.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image maxH={"300px"} src={product.image} alt={product.name} />
      <Box p={4}>
        <Heading as="h3" size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={"blue"} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" />
          <IconButton icon={<DeleteIcon />} colorScheme="blue" />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCardList;
