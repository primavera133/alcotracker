import { Box, Heading, Text } from "@chakra-ui/react";

import { TextLink } from "./TextLink";
export function About() {
  return (
    <Box maxWidth={"lg"}>
      <Heading as="h1" m={4}>
        About Alcotracker
      </Heading>

      <Text m={4}>
        Did you ever consider how much you drink, but don't think that's anyone
        elses business? Not something you want to share with app makers,
        advertisers or any one else, really?
      </Text>
      <Text m={4}>
        This app let's you keep track of your consumption. It aplies no moral
        and does not tell you if you drink too much. It only helps you record
        and gives you some simple statistics.
      </Text>

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
        This app aims to not share any data with anyone without you being
        specifically in control. It does not send any data over internet. The
        only database it uses is locally on your device.
      </Text>

      <Text m={4}>
        However, the developer of this app does not guarantee that your data
        will be kept 100% private. What your phone och computer does with the
        data is out of this apps control. Most likely nothing will be sent
        anywhere, but who knows these days.
      </Text>

      <Heading as="h2" mx={4} my={2} fontSize={20}>
        Syncing data
      </Heading>

      <Text m={4}>
        Since you don't create an account in a central place, there is no way to
        sync your data automatically between differnet devices. You can export
        your data manually (as CSV or JSON) and import it if you wish to backup
        or change to using the app on another device.
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

      <Heading as="h2" mx={4} my={2} fontSize={20}>
        Having problems?
      </Heading>

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
