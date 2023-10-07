import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextButton from "src/components/shared/TextButton";

test("renders button with text and triggers onClick event", () => {
  const buttonText = "Click me";
  const onClickMock = jest.fn();

  render(
    <TextButton onClick={onClickMock}>{buttonText}</TextButton>
  );

  const button = screen.getByText(buttonText);
  fireEvent.click(button);

  expect(button).toBeInTheDocument();
  expect(onClickMock).toHaveBeenCalledTimes(1);
});