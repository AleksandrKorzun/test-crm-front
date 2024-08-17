import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { FormEventHandler, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/apiUsers";

export const SignUp = () => {
  const { user, setUser } = useAuth()!;
  const [show, setShow] = React.useState(false);
  const [userForm, setUserForm] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const toast = useToast();
  const navigate = useNavigate();

  const resetForm = () => setUserForm({ email: "", password: "", name: "" });

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(userForm);
      resetForm();
      setUser(user);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to create account.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleClick = () => setShow(!show);

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [navigate, user]);

  return (
    <Flex w="300px" m="auto" flexDirection="column" gap="30px">
      <Heading size="xl" noOfLines={1} textAlign="center">
        Sign Up
      </Heading>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Username"
          mb={4}
          value={userForm.name}
          onChange={(e) =>
            setUserForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          mb={4}
          value={userForm.email}
          onChange={(e) =>
            setUserForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <FormLabel>Password</FormLabel>
        <InputGroup size="md" flexDirection="column" mb={4}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={userForm.password}
            onChange={(e) =>
              setUserForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="blue" w="full" onClick={onSubmit}>
          Sign Up
        </Button>
      </FormControl>
      <Text textAlign="center">
        Already have an account?{" "}
        <Link href="/signin" color="#11d455" ml={4}>
          Sign In
        </Link>
      </Text>
    </Flex>
  );
};
