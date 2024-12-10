import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
  IconButton,
  Icon,
  Box,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useUserStore } from "../store/user";
import { useEffect } from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const { user, logOutUser, rehydrateUser } = useUserStore();

  useEffect(() => {
    rehydrateUser();
  }, [rehydrateUser]);

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
              <Flex justifyItems={"space-between"} alignItems={"center"}>
                <Box fontSize={"28px"} position="relative" mx={5}>
                  <Link to={"/cart"}>
                    <Icon color={"teal"} as={FaShoppingCart} boxSize={6} />
                  </Link>

                  {2 > 0 && (
                    <Box
                      position="absolute"
                      top="-1"
                      right="-1"
                      bg="red.500"
                      color="white"
                      borderRadius="full"
                      width="20px"
                      height="20px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="sm"
                    >
                      <Text>{0}</Text>
                    </Box>
                  )}
                </Box>
                <Button onClick={logOutUser}>
                  {" "}
                  <FaSignOutAlt /> Log Out
                </Button>
              </Flex>
            ) : (
              <>
                {" "}
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
              </>
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
