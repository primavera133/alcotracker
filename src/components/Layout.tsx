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
            <Tab onClick={() => handleClick("/")} p={0} px={2}>
              <Image
                src="/alcotracker.jpeg"
                boxSize="32px"
                objectFit="cover"
                minWidth="32px"
              />
            </Tab>
            <Tab onClick={() => handleClick("/register")} px={2}>
              <Link>Register</Link>
            </Tab>
            <Tab onClick={() => handleClick("/records")} px={2}>
              <Link>Records</Link>
            </Tab>
            <Tab onClick={() => handleClick("/statistics")} px={2}>
              <Link>Statistics</Link>
            </Tab>
            <Tab onClick={() => handleClick("/data")} px={2}>
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
