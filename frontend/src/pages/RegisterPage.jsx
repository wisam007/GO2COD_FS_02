import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <Box p={6} maxW="1200px" mx="auto" mt={8}>
      <Flex
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        bg={useColorModeValue("white", "gray.800")}
        direction={{ base: "column", md: "row" }}
      >
        {/* Left Side - Text */}
        <Box
          flex="1"
          p={8}
          bgGradient="linear(to-br, purple.400, pink.500)"
          color="white"
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Heading size="2xl" mb={4}>
              Create Account
            </Heading>
            <Text fontSize="lg">
              Join us today and enjoy exclusive benefits.
            </Text>
          </Box>
        </Box>

        {/* Right Side - Form */}
        <Box flex="1" p={8}>
          <Heading size="lg" mb={6} textAlign="center">
            Register Your Account
          </Heading>
          <form>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                bg={useColorModeValue("gray.100", "gray.700")}
                _placeholder={{
                  color: useColorModeValue("gray.500", "gray.400"),
                }}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                bg={useColorModeValue("gray.100", "gray.700")}
                _placeholder={{
                  color: useColorModeValue("gray.500", "gray.400"),
                }}
              />
            </FormControl>
            <FormControl mb={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                bg={useColorModeValue("gray.100", "gray.700")}
                _placeholder={{
                  color: useColorModeValue("gray.500", "gray.400"),
                }}
              />
            </FormControl>
            <Button
              colorScheme="purple"
              size="lg"
              width="full"
              type="submit"
              mb={4}
            >
              Register
            </Button>
            <Text
              textAlign="center"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              Have an account?{" "}
              <Link to="/login">
                <Text as="span" color="purple.500" cursor="pointer">
                  Login
                </Text>
              </Link>
            </Text>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default RegisterPage;
