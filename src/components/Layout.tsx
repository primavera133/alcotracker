import { Flex, Icon, Image, Tab, TabList, Tabs, Text } from "@chakra-ui/react";

import { FaInfo } from "react-icons/fa";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { useRegisterStore } from "../stores/registerStore";

export function Layout() {
  const navigate = useNavigate();
  const resetForm = useRegisterStore((state) => state.resetForm);

  const handleClick = (where: string) => {
    resetForm();
    navigate(where);
  };

  return (
    <div className="App">
      <nav>
        <Tabs>
          <TabList>
            <Tab
              onClick={() => handleClick("/")}
              p={0}
              px={2}
              data-testId="nav-home"
            >
              <Image
                src="/alcotracker.jpeg"
                boxSize="32px"
                objectFit="cover"
                minWidth="32px"
              />
            </Tab>
            <Tab
              onClick={() => handleClick("/register")}
              px={2}
              data-TestId="nav-register"
            >
              Register
            </Tab>
            <Tab
              onClick={() => handleClick("/records")}
              px={2}
              data-TestId="nav-records"
            >
              Records
            </Tab>
            <Tab
              onClick={() => handleClick("/statistics")}
              px={2}
              data-TestId="nav-statistics"
            >
              Statistics
            </Tab>
            <Tab
              onClick={() => handleClick("/data")}
              px={2}
              data-TestId="nav-data"
            >
              Data
            </Tab>
          </TabList>
        </Tabs>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <Flex
          borderTop="2px solid grey"
          p={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <RouterLink to="/about" data-testId="footer-about">
            <Icon as={FaInfo} /> About alcotracker
          </RouterLink>

          <Text m={4}>Version {process.env.REACT_APP_VERSION}</Text>
        </Flex>
      </footer>
    </div>
  );
}
