import { Box, Heading, Text } from "@chakra-ui/react";

import { TextLink } from "./TextLink";
export function About() {
  return (
    <Box maxWidth={"lg"}>
      <Heading as="h1" m={4}>
        About Alcotracker
      </Heading>

      <Heading as="h2" mx={4} my={2} fontSize={20}>
        Installation
      </Heading>
      <Text m={4}>
        This is a PWA. It's a webpage but can be installed as an app on a
        device, like your phone or your laptop.{" "}
        <TextLink
          href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing"
          isExternal
        >
          Learn more here
        </TextLink>
      </Text>

      <Heading as="h2" mx={4} my={2} fontSize={20}>
        Regarding privacy
      </Heading>

      <Text m={4}>
        This app gives you the possibility to record alcohol intake and get some
        simple statistics for you own personal use. It aims to not share any
        data with anyone without your specific control. It does not send any
        data over network, the only database it uses is locally on your device
        (IndexedDB).
      </Text>
      <Text m={4}>
        However, the developer of this app does not guarantee that your data
        will be kept 100% private. What your phone och computer does with the
        data is out of this apps control. Most likely nothing will be sent
        anywhere, but who knows these days.
      </Text>

      <Heading as="h2" mx={4} my={2} fontSize={20}>
        Support me
      </Heading>
      <Text m={4}>
        You like this app? Show your appreciation at{" "}
        <TextLink href="https://ko-fi.com/jonasmyrenas" isExternal>
          ko-fi
        </TextLink>
      </Text>
      <Text m={4}>
        If you find any problems with the app, file an issue at{" "}
        <TextLink
          href="https://github.com/primavera133/alcotracker/issues"
          isExternal
        >
          Github
        </TextLink>
      </Text>
    </Box>
  );
}
