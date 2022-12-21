import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Player from ".";

test("renders player information and two buttons", () => {
  render(<Player name="Hansi" score={10} />);

  const player = screen.getByText("Hansi");
  expect(player).toBeInTheDocument();

  const score = screen.getByText(/10/);
  expect(score).toBeInTheDocument();

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);
});

test("calls callbacks when increasing or decreasing score", async () => {
  const decrease = jest.fn();
  const increase = jest.fn();
  render(
    <Player
      name="Hansi"
      score={10}
      onDecreasePlayerScore={decrease}
      onIncreasePlayerScore={increase}
    />
  );

  const user = userEvent.setup();

  const incButton = screen.getByRole("button", { name: "Increase Score" });
  const decButton = screen.getByRole("button", { name: "Decrease Score" });

  await user.click(incButton);
  await user.click(incButton);
  await user.click(decButton);

  expect(increase).toHaveBeenCalledTimes(2);
  expect(decrease).toHaveBeenCalledTimes(1);
});
