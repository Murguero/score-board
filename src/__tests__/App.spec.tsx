import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../App';

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('start the when click on "Start Game"', () => {
    const startButton = screen.getByTestId('start-game-1');
    fireEvent.click(startButton);

    expect(screen.getByTestId('score-board-1')).toBeInTheDocument();
    expect(screen.getByTestId('home-team-score-Mexico')).toHaveTextContent('0');
    expect(screen.getByTestId('away-team-score-Canada')).toHaveTextContent('0');
  });

  test('update the score board when click on "Update Score"', () => {
    const startButton = screen.getByTestId('start-game-1');
    fireEvent.click(startButton);

    const initialHomeScore = screen.getByTestId('home-team-score-Mexico').textContent;
    const initialAwayScore = screen.getByTestId('away-team-score-Canada').textContent;

    const updateButton = screen.getByTestId('update-score-1');
    fireEvent.click(updateButton);

    const updatedHomeScore = screen.getByTestId('home-team-score-Mexico').textContent;
    const updatedAwayScore = screen.getByTestId('away-team-score-Canada').textContent;

    expect(Number(updatedHomeScore)).toBeGreaterThanOrEqual(Number(initialHomeScore));
    expect(Number(updatedAwayScore)).toBeGreaterThanOrEqual(Number(initialAwayScore));
  });

  test('remove match from the score board and put on summary when click on "Finish Game"', () => {
    const startButton = screen.getByTestId('start-game-1');
    fireEvent.click(startButton);

    const finishButton = screen.getByTestId('finish-game-1');
    fireEvent.click(finishButton);

    expect(screen.queryByTestId('score-board-1')).toBeNull();
    expect(screen.getByText('Summary - Live Football World Cup Score Board')).toBeInTheDocument();
    expect(screen.getByText('Mexico')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });
});
