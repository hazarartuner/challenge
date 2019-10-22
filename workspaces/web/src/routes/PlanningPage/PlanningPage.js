import React from 'react';
import classNames from 'classnames';
import StoryList from 'components/StoryList';
import ScoreCards from 'components/ScoreCards';
import ScrumMasterPanel from 'components/ScrumMasterPanel';
import { useSelector } from 'react-redux';
import logo from 'assets/images/logo.png';
import './PlanningPage.scss';
import { accountSelector } from 'redux/ducks/auth/selectors';

const PlanningPage = () => {
  const account = useSelector(accountSelector);
  const developersPanelLink = 'http://localhost/scrum-planning-developer';
  const isScrumMaster = account && account.role === 'MASTER';

  return (
    <div
      className={classNames('planning__page', {
        'scrum-master': isScrumMaster,
      })}
    >
      <img src={logo} alt="Scrum Pocker" className="logo" />

      <p className="share">
        Share: <span>{developersPanelLink}</span>
      </p>

      <StoryList stories={[]} rootClassName="story-list" />

      <ScoreCards rootClassName="score-cards" />

      {isScrumMaster && (
        <ScrumMasterPanel
          story={{ title: 'Story 1', status: 'ACTIVE' }}
          votes={[]}
          rootClassName="scrum-master-panel"
        />
      )}
    </div>
  );
};

export default PlanningPage;
