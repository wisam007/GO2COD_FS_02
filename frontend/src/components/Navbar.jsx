import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useUserStore } from "../store/user";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const { user, logOUtUser } = useUserStore();

  user ? console.log(user) : console.log("User not found");

  return (
    <Box
      boxShadow="sm"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW={"1140px"}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", sm: "row" }}
        >
          {/* Logo Section */}
          <Link to={"/"}>
            <Text
              fontSize={{ base: "22", sm: "28" }}
              fontWeight="bold"
              textTransform={"uppercase"}
              textAlign={"center"}
              bgGradient="linear(to-r, teal.400, cyan.500)"
              bgClip="text"
              _hover={{
                bgGradient: "linear(to-r, blue.500, cyan.400)",
              }}
            >
              E-Store 🛒
            </Text>
          </Link>

          {/* Right Buttons */}
          <HStack spacing={4} mt={{ base: 4, sm: 0 }}>
            {user ? (
              <Button onClick={logOUtUser}> Log Out</Button>
            ) : (
              <Link to={"/login"}>Login</Link>
            )}

            {/* Dark Mode Toggle */}
            <IconButton
              aria-label="Toggle Theme"
              onClick={toggleColorMode}
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              variant="outline"
              colorScheme={colorMode === "dark" ? "yellow" : "blue"}
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
