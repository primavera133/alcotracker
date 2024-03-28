import { useEffect } from "react";
import "./App.css";
import { initDB } from "./db/db";
// import { loadDB } from "./db/loadDb";
import { Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { Data } from "./components/Data";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import { Records } from "./components/Records";
import { Register } from "./components/Register";
import { Statistics } from "./components/Statistics";
import { useDbStore } from "./stores/dbStore";

export enum RouterPaths {
  home = "/",
  register = "/register",
  records = "/records",
  statistics = "/statistics",
  data = "/data",
  about = "/about",
}

export function App() {
  const setInitialized = useDbStore((state) => state.setInitialized);

  useEffect(() => {
    (async () => {
      const dbInitialized = await initDB();
      setInitialized(dbInitialized);
      // loadDB();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path={RouterPaths.home} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={RouterPaths.register} element={<Register />} />
        <Route path={RouterPaths.records} element={<Records />} />
        <Route path={RouterPaths.statistics} element={<Statistics />} />
        <Route path={RouterPaths.data} element={<Data />} />
        <Route path={RouterPaths.about} element={<About />} />
      </Route>
    </Routes>
  );
}
