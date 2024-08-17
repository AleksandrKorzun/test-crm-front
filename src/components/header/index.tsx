import {
  Divider,
  Flex,
  Link,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/apiUsers";

export const Header = () => {
  const { user, setUser } = useAuth()!;

  const navigate = useNavigate();

  const signOut = async () => {
    await logout(user?.id as string);
    setUser(null);
    localStorage.setItem("user", "");
    navigate("/signin");
  };
  return (
    <header>
      <Flex
        w="full"
        height="60px"
        background="#2e4d69"
        p="10px"
        alignItems="center"
        justifyContent="space-between"
        gap={10}
      >
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Text color="white">LOGO</Text>
          <nav>
            <List
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap="50px"
            >
              <ListItem>
                <Link color="#fff" as={NavLink} to="/">
                  Home
                </Link>
              </ListItem>
              <ListItem>
                <Link color="#fff" as={NavLink} to="product">
                  Product
                </Link>
              </ListItem>
              <ListItem>
                <Link as={NavLink} to="blog" color="#fff">
                  Blog
                </Link>
              </ListItem>
              <ListItem>
                <Link as={NavLink} to="contact" color="#fff">
                  Contact
                </Link>
              </ListItem>
            </List>
          </nav>
        </Flex>
        <Menu>
          <MenuButton aria-label="Options" p="10px" color="white">
            Menu
          </MenuButton>
          <MenuList>
            <MenuItem as={NavLink} to="profile">
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={signOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </header>
  );
};
