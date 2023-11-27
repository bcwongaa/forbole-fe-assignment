import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the board', () => {
  const { getAllByRole } = render(<App />);
  const squares = getAllByRole('button');

  // 9 box with 1 restart button
  expect(squares.length).toBe(10);
});

test('User clicks the boards and wins', () => {
  const { getAllByRole } = render(<App />);
  const squares = getAllByRole('button');

  fireEvent.click(squares[0]);
  fireEvent.click(squares[3]);
  fireEvent.click(squares[1]);
  fireEvent.click(squares[4]);
  fireEvent.click(squares[2]);
  const status = screen.getByText('X wins!');
  expect(status).toBeInTheDocument();
});

test('User clicks the reset should clear the board', () => {
  const { getAllByRole } = render(<App />);
  const squares = getAllByRole('button');

  fireEvent.click(squares[0]);
  fireEvent.click(squares[3]);
  fireEvent.click(squares[1]);
  fireEvent.click(squares[4]);
  fireEvent.click(squares[2]);

  fireEvent.click(squares[9]); // restart game button
  const status = screen.getByText('Player X turn:');
  expect(status).toBeInTheDocument;
});

test('Reload should keeps the boards status', () => {
  const { getAllByRole } = render(<App />);
  const squares = getAllByRole('button');

  fireEvent.click(squares[0]);
  fireEvent.click(squares[3]);
  fireEvent.click(squares[1]);
  fireEvent.click(squares[4]);
  fireEvent.click(squares[2]);

  window.location.reload();

  const status = screen.getByText('X wins!');
  expect(status).toBeInTheDocument();
});
