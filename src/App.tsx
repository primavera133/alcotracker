import { Box, Link, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import "./App.css";
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
