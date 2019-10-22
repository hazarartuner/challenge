import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ScrumMasterPanel.scss';

const ScrumMasterPanel = props => {
  const { story, votes, rootClassName } = props;

  return (
    <div
      className={classNames('scrum-master-panel__component', {
        [rootClassName]: !!rootClassName,
      })}
    >
      <h2>Scrum Master Panel</h2>

      <div className="contents-wrapper">
        <p>
          {story.title} is {story.status}
        </p>
        <ul>
          {votes.map((vote, index) => (
            <li key={votes.id}>
              Voter ${index + 1}: ${vote.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ScrumMasterPanel.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    finalScore: PropTypes.number,
    status: PropTypes.oneOf(['ACTIVE', 'VOTED', 'NOT_VOTED']),
  }).isRequired,
  votes: PropTypes.arrayOf([
    PropTypes.shape({
      score: PropTypes.number,
      user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        role: PropTypes.required,
      }),
    }),
  ]),
  rootClassName: PropTypes.string,
};

ScrumMasterPanel.defaultProps = {
  votes: [],
  rootClassName: null,
};

export default ScrumMasterPanel;
