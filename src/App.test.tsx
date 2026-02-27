import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

jest.mock("./db/db", () => ({
  initDB: jest.fn().mockResolvedValue(true),
}));

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
