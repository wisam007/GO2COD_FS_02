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
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserStore } from "../store/user";

const LoginPage = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { logInUser, user } = useUserStore();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (user) {
      isAdmin ? navigate("/manage") : navigate("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await logInUser(formData);
  };
  return (
    <Box p={6} maxW="1200px" mx="auto" mt={8}>
      <Flex
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        bg={useColorModeValue("white", "gray.800")}
        direction={{ base: "column", md: "row" }}
      >
        <Box
          flex="1"
          p={8}
          bgGradient="linear(to-br, teal.400, blue.500)"
          color="white"
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Heading size="2xl" mb={4}>
              {isAdmin ? "Admin Login" : "User Login"}
            </Heading>
            <Text fontSize="lg">
              Welcome back! Please log in to your account to continue.
            </Text>
          </Box>
        </Box>

        {/* Right Side - Form */}
        <Box flex="1" p={8}>
          <Heading size="lg" mb={6} textAlign="center">
            Login to Your Account
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Email Address</FormLabel>
              <Input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                onChange={handleChange}
                bg={useColorModeValue("gray.100", "gray.700")}
                _placeholder={{
                  color: useColorModeValue("gray.500", "gray.400"),
                }}
              />
            </FormControl>
            <FormControl mb={6}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                onChange={handleChange}
                bg={useColorModeValue("gray.100", "gray.700")}
                _placeholder={{
                  color: useColorModeValue("gray.500", "gray.400"),
                }}
              />
            </FormControl>
            <Button
              colorScheme="teal"
              size="lg"
              width="full"
              type="submit"
              mb={4}
            >
              Login
            </Button>
            <Text
              textAlign="center"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              Don't have an account?{" "}
              <Link to={"/register"}>
                {" "}
                <Text as="span" color="teal.500" cursor="pointer">
                  Sign Up
                </Text>
              </Link>
            </Text>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginPage;
