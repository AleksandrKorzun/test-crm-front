import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TextField } from "../components/TextField";
import { useAuth } from "../context/AuthContext";
import { updateUser, UserType } from "../services/apiUsers";

export const Profile = () => {
  const { user } = useAuth()!;
  const toast = useToast();
  const [currentUser, setCurrentUser] = useState<Partial<UserType>>(
    user as Partial<UserType>
  );

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await updateUser(user?.id || "", currentUser);
      toast({
        title: "Profile updated.",
        description: "Your profile has been updated.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to update profile.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box m="50px auto" width="400px">
      <Heading size="xl" mb="30px">
        Hello, {currentUser?.name}
      </Heading>
      <FormControl isRequired display="flex" gap="20px" flexDirection="column">
        <TextField
          label="Name"
          value={currentUser?.name || ""}
          setValue={(name) => setCurrentUser((prev) => ({ ...prev, name }))}
        />
        <TextField
          label="Email"
          value={currentUser?.email || ""}
          setValue={(email) => setCurrentUser((prev) => ({ ...prev, email }))}
        />
        <TextField
          label="Phone"
          value={currentUser?.phone || ""}
          setValue={(phone) => setCurrentUser((prev) => ({ ...prev, phone }))}
        />
        <Flex gap={5}>
          <Button w="100px">Cancel</Button>
          <Button w="100px" onClick={handleSubmit}>
            Save
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};
