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
import { signIn } from "../services/apiUsers";

export const SignIn = () => {
  const { user, setUser } = useAuth()!;
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const toast = useToast();
  const resetFrom = () => setForm({ email: "", password: "" });

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(form);

      resetFrom();
      toast({
        title: "Sign In successful.",
        duration: 4000,
        status: "success",
        isClosable: true,
      });
      setUser(user.user);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to sign in.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleClick = () => setShow(!show);

  useEffect(() => {
    if (user?.isLogin) {
      console.log("login");
      navigate("/profile");
    }
  }, [navigate, user?.isLogin]);
  return (
    <Flex w="300px" m="auto" flexDirection="column" gap="30px">
      <Heading size="xl" noOfLines={1} textAlign="center">
        Sign In
      </Heading>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          mb={4}
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <FormLabel>Password</FormLabel>
        <InputGroup size="md" flexDirection="column" mb={4}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="blue" w="full" onClick={onSubmit}>
          Sign In
        </Button>
      </FormControl>
      <Text textAlign="center">
        Don’t have an account?{" "}
        <Link href="/signup" color="#11d455" ml={4}>
          Sign Up
        </Link>
      </Text>
    </Flex>
  );
};
