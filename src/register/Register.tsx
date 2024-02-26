import { Box, Heading } from "@chakra-ui/react";
import { AddUnits } from "../components/AddUnits";
import { Form } from "../components/Form";
import { Units } from "../components/Units";

export function Register() {
  return (
    <Box id="register" maxWidth={"lg"} mx={4}>
      <Heading as="h1" my={4}>
        Add a drink
      </Heading>
      <Form />
      <Units />
      <AddUnits />
    </Box>
  );
}
