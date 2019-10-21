import React from 'react';
import './SessionsPage.scss';

const SessionsPage = () => {
  return (
    <div className="sessions__page">
      <h1>Sessions List</h1>
      <table>
        <tbody>
          <tr>
            <td>Session 1</td>
            <td>
              <button className="button secondary" type="button">
                View
              </button>
            </td>
          </tr>
          <tr>
            <td>Session 1</td>
            <td>
              <button className="button secondary" type="button">
                View
              </button>
            </td>
          </tr>
          <tr>
            <td>Session 1</td>
            <td>
              <button className="button secondary" type="button">
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button className="button create" type="button">
        New Session
      </button>
    </div>
  );
};

export default SessionsPage;
