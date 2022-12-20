import { render, screen } from "@testing-library/react";
import Navigation from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return { pathname: jest.fn() };
  },
}));

test("renders with two links 'Play' and 'History'", () => {
  render(<Navigation />);

  const navigationLinks = screen.getAllByRole("link");

  expect(navigationLinks.length).toBe(2);
  expect(navigationLinks[0]).toHaveAccessibleName("Play");
  expect(navigationLinks[1]).toHaveAccessibleName("History");
});
