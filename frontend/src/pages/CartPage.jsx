import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Image,
  Text,
  Button,
  IconButton,
  Divider,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useState } from "react";

const CartPage = () => {
  // Dummy data for the cart
  const [cart, setCart] = useState([
    {
      _id: "1",
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 1,
      image: "https://via.placeholder.com/100",
      description: "High-quality sound and noise cancellation.",
    },
    {
      _id: "2",
      name: "Smart Watch",
      price: 199.99,
      quantity: 2,
      image: "https://via.placeholder.com/100",
      description: "Track your fitness and notifications seamlessly.",
    },
  ]);

  // Calculate total price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handlers for cart actions
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        Your Shopping Cart 🛒
      </Heading>
      {cart.length === 0 ? (
        <Box textAlign="center" mt={8}>
          <Text fontSize="xl" color={useColorModeValue("gray.600", "gray.400")}>
            Your cart is empty.
          </Text>
          <Button
            mt={4}
            colorScheme="blue"
            size="lg"
            onClick={() => (window.location.href = "/")}
          >
            Start Shopping
          </Button>
        </Box>
      ) : (
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          {/* Cart Items Section */}
          <Box flex={3}>
            <VStack spacing={6} align="stretch">
              {cart.map((item) => (
                <HStack
                  key={item._id}
                  bg={useColorModeValue("white", "gray.800")}
                  shadow="md"
                  p={4}
                  rounded="lg"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="lg"
                  />
                  <Box flex={1}>
                    <Heading as="h3" size="md" mb={2}>
                      {item.name}
                    </Heading>
                    <Text color="blue.500" fontWeight="bold" mb={1}>
                      ${item.price.toFixed(2)} x {item.quantity}
                    </Text>
                    <Text
                      fontSize="sm"
                      color={useColorModeValue("gray.600", "gray.400")}
                    >
                      {item.description}
                    </Text>
                    <HStack mt={3}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => decreaseQuantity(item._id)}
                        isDisabled={item.quantity === 1}
                      >
                        <MinusIcon />
                      </Button>
                      <Text>{item.quantity}</Text>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => increaseQuantity(item._id)}
                      >
                        <AddIcon />
                      </Button>
                    </HStack>
                  </Box>
                  <IconButton
                    icon={<CloseIcon />}
                    aria-label="Remove item"
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromCart(item._id)}
                  />
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Checkout Section */}
          <Box
            flex={1}
            bg={useColorModeValue("white", "gray.800")}
            shadow="lg"
            p={6}
            rounded="lg"
          >
            <Heading as="h2" size="lg" mb={6}>
              Order Summary
            </Heading>
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between">
                <Text fontWeight="bold">Subtotal</Text>
                <Text>${cartTotal.toFixed(2)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Shipping</Text>
                <Text>$5.00</Text>
              </Flex>
              <Divider />
              <Flex justify="space-between">
                <Text fontSize="xl" fontWeight="bold">
                  Total
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  ${(cartTotal + 5).toFixed(2)}
                </Text>
              </Flex>
              <Button
                colorScheme="green"
                size="lg"
                w="full"
                onClick={() => alert("Proceeding to Checkout!")}
              >
                Checkout
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                size="lg"
                w="full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </VStack>
          </Box>
        </Flex>
      )}
    </Container>
  );
};

export default CartPage;
