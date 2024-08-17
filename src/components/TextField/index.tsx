import { Box, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { PencilIcon } from "../../shared/icons/pencil";
import { CheckmarkIcon } from "../../shared/icons/check";

type TextFieldProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
};
export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  setValue,
}) => {
  const [valueInput, setValueInput] = useState(value);
  const [isRedacting, setIsRedacting] = useState(false);

  return (
    <>
      {isRedacting ? (
        <Box>
          <FormLabel>{label}</FormLabel>
          <Flex gap={5} alignItems="center">
            <Input
              value={value}
              onChange={(e) => {
                setValueInput(e.target.value);

                setValue(e.target.value);
              }}
            />
            <CheckmarkIcon
              onClick={() => setIsRedacting(false)}
              cursor="pointer"
              w="20px"
              h="20px"
            />
          </Flex>
        </Box>
      ) : (
        <Flex gap="15px">
          <Text>{valueInput || "---"}</Text>
          <PencilIcon
            cursor="pointer"
            onClick={() => setIsRedacting(true)}
            w="24px"
            h="24px"
          />
        </Flex>
      )}
    </>
  );
};
