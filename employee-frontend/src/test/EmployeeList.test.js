import { render, screen } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  window.alert = jest.fn();

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve([
          { id: 1, firstName: "John", lastName: "Doe" },
          { id: 2, firstName: "Jane", lastName: "Smith" },
        ]),
    }),
  );
});

test("loads and displays employee list", async () => {
  render(<App />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByText(/john/i)).toBeInTheDocument();
  expect(await screen.findByText(/doe/i)).toBeInTheDocument();
});
