import { useCallback, useEffect, useState } from 'react';

import './global.css';

import styles from './App.module.css';

const matches = [
  {
    id: 1,
    homeTeam: 'Mexico',
    awayTeam: 'Canada',
    homeTeamScore: 0,
    awayTeamScore: 0,
    showScore: false,
  },
  {
    id: 2,
    homeTeam: 'Spain',
    awayTeam: 'Brazil',
    homeTeamScore: 0,
    awayTeamScore: 0,
    showScore: false,
  },
  {
    id: 3,
    homeTeam: 'Germany',
    awayTeam: 'France',
    homeTeamScore: 0,
    awayTeamScore: 0,
    showScore: false,
  },
  {
    id: 4,
    homeTeam: 'Uruguay',
    awayTeam: 'Italy',
    homeTeamScore: 0,
    awayTeamScore: 0,
    showScore: false,
  },
  {
    id: 5,
    homeTeam: 'Argentina',
    awayTeam: 'Australia',
    homeTeamScore: 0,
    awayTeamScore: 0,
    showScore: false,
  },
];

interface ILiveMatches {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamScore: number;
  awayTeamScore: number;
  showScore: boolean;
}

interface IGenericProps {
  id: number;
}

interface IGetRandomNumberProps {
  maxValue: number;
  minValue: number;
}

export function App() {
  const [liveMatches, setLiveMatches] = useState<ILiveMatches[]>([]);
  const [summaryMatches, setSummaryMatches] = useState<ILiveMatches[]>([]);

  useEffect(() => {
    setLiveMatches(matches);
  }, []);

  const getRandomNumber = ({ maxValue, minValue }: IGetRandomNumberProps) => {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  };

  const startGame = useCallback(
    ({ id }: IGenericProps) => {
      const updateMatch = liveMatches.map((match) => {
        if (match.id === id && !match.showScore) {
          match.showScore = true;
        }
        return match;
      });

      setLiveMatches(updateMatch);
    },
    [liveMatches]
  );

  const updateScore = useCallback(
    ({ id }: IGenericProps) => {
      const updateMatch = liveMatches.map((match) => {
        if (match.id === id && match.showScore) {
          match.homeTeamScore = getRandomNumber({
            maxValue: match.homeTeamScore + 1,
            minValue: match.homeTeamScore,
          });
          match.awayTeamScore = getRandomNumber({
            maxValue: match.awayTeamScore + 1,
            minValue: match.awayTeamScore,
          });
        }
        return match;
      });

      setLiveMatches(updateMatch);
    },
    [liveMatches]
  );

  const finishMatch = useCallback(
    ({ id }: IGenericProps) => {
      const matchIndex = liveMatches.findIndex((match) => match.id === id && match.showScore);
      if (matchIndex > -1) {
        const newSummaryMatches = summaryMatches;

        newSummaryMatches.unshift(liveMatches[matchIndex]);
        setSummaryMatches(newSummaryMatches);

        setLiveMatches((matches) => matches.filter((_s, index) => index !== matchIndex));
      }
    },
    [liveMatches, summaryMatches]
  );

  return (
    <div className={styles.content}>
      <div>
        <div className={styles.divTitle}>
          <span className={styles.title}> Live Football World Cup Score Board</span>
        </div>
        <div className={styles.wrapper}>
          {liveMatches.map((match) => {
            return (
              <div className={styles.scoreBoard} key={match.id}>
                <div className={styles.card}>
                  <div className={styles.matchInfos}>
                    <span className={styles.textInfos}>{match.homeTeam}</span>
                    <span className={styles.textInfos}>{match.awayTeam}</span>
                  </div>
                  {match.showScore && (
                    <div data-testid={`score-board-${match.id}`} className={styles.matchInfos}>
                      <span
                        data-testid={`home-team-score-${match.homeTeam}`}
                        className={styles.textInfos}
                      >
                        {match.homeTeamScore}
                      </span>
                      <span
                        data-testid={`away-team-score-${match.awayTeam}`}
                        className={styles.textInfos}
                      >
                        {match.awayTeamScore}
                      </span>
                    </div>
                  )}
                </div>
                <div className={styles.buttonDiv}>
                  <button
                    data-testid={`start-game-${match.id}`}
                    className={styles.buttonStyle}
                    onClick={() => startGame({ id: match.id })}
                  >
                    Start Game
                  </button>
                  <button
                    data-testid={`update-score-${match.id}`}
                    className={styles.buttonStyle}
                    onClick={() => updateScore({ id: match.id })}
                  >
                    Update Score
                  </button>
                  <button
                    data-testid={`finish-game-${match.id}`}
                    className={styles.buttonStyle}
                    onClick={() => finishMatch({ id: match.id })}
                  >
                    Finish Game
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className={styles.divTitle}>
          <span className={styles.title}> Summary - Live Football World Cup Score Board</span>
        </div>
        <div className={styles.wrapper}>
          {summaryMatches.map((match) => {
            return (
              <div className={styles.scoreBoard} key={match.id}>
                <div className={styles.card}>
                  <div className={styles.matchInfos}>
                    <span className={styles.textInfos}>{match.homeTeam}</span>
                    <span className={styles.textInfos}>{match.awayTeam}</span>
                  </div>
                  <div className={styles.matchInfos}>
                    <span className={styles.textInfos}>{match.homeTeamScore}</span>
                    <span className={styles.textInfos}>{match.awayTeamScore}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
