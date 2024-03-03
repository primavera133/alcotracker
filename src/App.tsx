import { Box, Link, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";
import { initDB } from "./db/db";
// import { loadDB } from "./db/loadDb";
import { Data } from "./data";
import { Records } from "./records";
import { Register } from "./register";
import { Statistics } from "./statistics";
import { useRegisterStore } from "./stores/registerStore";

enum MainNavAlternatives {
  "register",
  "records",
  "statistics",
  "data",
}

export function App() {
  const [main, setMain] = useState<MainNavAlternatives>(
    MainNavAlternatives.register
  );
  const resetForm = useRegisterStore((state) => state.resetForm);

  const handleNav = (whereTo: MainNavAlternatives) => {
    resetForm();
    setMain(whereTo);
  };

  useEffect(() => {
    (async () => {
      await initDB();
      // loadDB();
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Tabs>
          <TabList>
            <Tab onClick={() => handleNav(MainNavAlternatives.register)}>
              <Link href="#register">Register</Link>
            </Tab>
            <Tab onClick={() => handleNav(MainNavAlternatives.records)}>
              <Link href="#records">Records</Link>
            </Tab>
            <Tab onClick={() => handleNav(MainNavAlternatives.statistics)}>
              <Link href="#statistics">Statistics</Link>
            </Tab>
            <Tab onClick={() => handleNav(MainNavAlternatives.data)}>
              <Link href="#data">Data</Link>
            </Tab>
          </TabList>
        </Tabs>
        <Box>
          {main === MainNavAlternatives.register && <Register />}
          {main === MainNavAlternatives.records && <Records />}
          {main === MainNavAlternatives.statistics && <Statistics />}
          {main === MainNavAlternatives.data && <Data />}
        </Box>
      </main>
      <footer>Footer links</footer>
    </div>
  );
}
