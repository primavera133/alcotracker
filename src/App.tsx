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

export function App() {
  useEffect(() => {
    (async () => {
      await initDB();
      // loadDB();
    })();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/records" element={<Records />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/data" element={<Data />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}
