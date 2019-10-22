import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ScoreCards.scss';

const ScoreCards = props => {
  const { rootClassName } = props;
  const [votedScore, setVotedScore] = useState(null);
  const scores = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134, -1];

  const handleClick = score => () => {
    setVotedScore(score);
  };

  return (
    <div
      className={classNames('score-cards__component', {
        [rootClassName]: !!rootClassName,
      })}
    >
      <h2>Score Cards</h2>
      <div className="cards-wrapper">
        <div className="cards-list">
          {scores.map(score => (
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
            <span
              key={score}
              role="button"
              className={classNames({ active: score === votedScore })}
              onClick={handleClick(score)}
            >
              {score === -1 ? '?' : score}
            </span>
          ))}
        </div>
        <p className="voted-text">{votedScore ? `${votedScore} Voted` : ''}</p>
      </div>
    </div>
  );
};

ScoreCards.propTypes = {
  rootClassName: PropTypes.string,
};

ScoreCards.defaultProps = {
  rootClassName: null,
};

export default ScoreCards;
