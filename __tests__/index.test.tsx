// __tests__/index.test.jsx

import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it.skip("renders a container", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "To-do-list",
    });

    expect(heading).toBeInTheDocument();
  });
});
