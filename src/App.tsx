import { Box, Link, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";
import { initDB } from "./db/db";
import { Register } from "./register";
import { Statistics } from "./statistics";

enum MainNavAlternatives {
  "register",
  "statistics",
}

export function App() {
  const [main, setMain] = useState<MainNavAlternatives>(
    MainNavAlternatives.register
  );

  useEffect(() => {
    (async () => await initDB())();
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
                onClick={() => setMain(MainNavAlternatives.register)}
              >
                Register
              </Link>
            </Tab>
            <Tab>
              <Link
                href="#statistics"
                onClick={() => setMain(MainNavAlternatives.statistics)}
              >
                Statistics
              </Link>
            </Tab>
          </TabList>
        </Tabs>
        <Box>
          {main === MainNavAlternatives.register && <Register />}
          {main === MainNavAlternatives.statistics && <Statistics />}
        </Box>
      </main>
      <footer>Footer links</footer>
    </div>
  );
}
