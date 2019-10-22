import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const StoryList = props => {
  const { stories, rootClassName } = props;

  return (
    <div
      className={classNames('story-list__component', {
        [rootClassName]: !!rootClassName,
      })}
    >
      <h2>Story List</h2>
      <table>
        <thead>
          <tr>
            <th>Story</th>
            <th>Final Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stories &&
            stories.map(({ id, title, finalScore, status }) => (
              <tr key={id}>
                <td>{title}</td>
                <td>{finalScore}</td>
                <td>{status}</td>
              </tr>
            ))}
          {(!stories || stories.length <= 0) && (
            <tr className="no-item">
              <td>No item found!</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

StoryList.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
      finalScore: PropTypes.number,
      status: PropTypes.oneOf(['ACTIVE', 'VOTED', 'NOT_VOTED']),
    })
  ).isRequired,
  rootClassName: PropTypes.string,
};

StoryList.defaultProps = {
  rootClassName: null,
};

export default StoryList;
