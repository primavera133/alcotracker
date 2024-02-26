import { Box, Link, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";
import { initDB } from "./db/db";
// import { loadDB } from "./db/loadDb";
import { Records } from "./records";
import { Register } from "./register";
import { Statistics } from "./statistics";
import { useRegisterStore } from "./stores/registerStore";

enum MainNavAlternatives {
  "register",
  "records",
  "statistics",
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
            <Tab>
              <Link
                href="#register"
                onClick={() => handleNav(MainNavAlternatives.register)}
              >
                Register
              </Link>
            </Tab>
            <Tab>
              <Link
                href="#records"
                onClick={() => handleNav(MainNavAlternatives.records)}
              >
                Records
              </Link>
            </Tab>
            <Tab>
              <Link
                href="#statistics"
                onClick={() => handleNav(MainNavAlternatives.statistics)}
              >
                Statistics
              </Link>
            </Tab>
          </TabList>
        </Tabs>
        <Box>
          {main === MainNavAlternatives.register && <Register />}
          {main === MainNavAlternatives.records && <Records />}
          {main === MainNavAlternatives.statistics && <Statistics />}
        </Box>
      </main>
      <footer>Footer links</footer>
    </div>
  );
}
