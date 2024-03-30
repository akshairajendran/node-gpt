import React from 'react';
import './CommandHistory.css'; // Import CSS file for styling

const CommandHistory = ({ commands }) => {
  return (
    <div className="command-history">
      <h3 className="command-history-title">Command History</h3>
      <ol className="command-list">
        {commands.map((command, index) => (
          <li key={index} className="command-item">
            {index + 1}. {command}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CommandHistory;

