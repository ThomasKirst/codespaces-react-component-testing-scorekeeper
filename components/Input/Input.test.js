import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from ".";

test("renders a label and an input with the correct attributes", () => {
  render(<Input labelText="Name of game" placeholder="Dodelido" name="game" />);

  const inputField = screen.getByLabelText("Name of game");
  expect(inputField).toBeInTheDocument();
  expect(inputField).toHaveAttribute("placeholder", "Dodelido");
});

test("calls callback on every user input", async () => {
  const mockFunction = jest.fn();
  render(
    <Input
      labelText="Name of game"
      placeholder="Dodelido"
      name="game"
      onChange={mockFunction}
    />
  );
  const inputField = screen.getByLabelText("Name of game");

  const user = userEvent.setup();
  await user.type(inputField, "abc");

  expect(mockFunction).toHaveBeenCalledTimes(3);
});
