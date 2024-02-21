import { Box, Heading } from "@chakra-ui/react";
import { AddUnits } from "./AddUnits";
import { Form } from "./Form";
import { Units } from "./Units";

export function Register() {
  return (
    <Box id="register">
      <Heading as="h1">Add a drink</Heading>
      <Form />
      <Units />
      <AddUnits />
    </Box>
  );
}
