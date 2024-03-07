import { Flex, Icon, Image, Link, Tab, TabList, Tabs } from "@chakra-ui/react";

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
            <Tab onClick={() => handleClick("/")}>
              <Image boxSize="32px" src="/alcotracker.jpeg" />
            </Tab>
            <Tab onClick={() => handleClick("/register")}>
              <Link>Register</Link>
            </Tab>
            <Tab onClick={() => handleClick("/records")}>
              <Link>Records</Link>
            </Tab>
            <Tab onClick={() => handleClick("/statistics")}>
              <Link>Statistics</Link>
            </Tab>
            <Tab onClick={() => handleClick("/data")}>
              <Link>Data</Link>
            </Tab>
          </TabList>
        </Tabs>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <Flex borderTop="2px solid grey" p={2} justifyItems="center">
          <RouterLink to="/about">
            <Icon as={FaInfo} /> About alcotracker
          </RouterLink>
        </Flex>
      </footer>
    </div>
  );
}
