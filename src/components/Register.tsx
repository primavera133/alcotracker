import { Box, Card, Heading } from "@chakra-ui/react";
import { AddUnits } from "./AddUnits";
import { Form } from "./Form";
import { Units } from "./Units";

export function Register() {
  return (
    <Box as="form" id="register" maxWidth={"lg"} mx={4}>
      <Card px={4} pb={4} my={4}>
        <Heading as="h1" my={4}>
          Add a drink
        </Heading>
        <Form />
        <Units />
        <AddUnits />
      </Card>
    </Box>
  );
}
