import * as React from 'react';
import ThemeContext from '../contexts/ThemeContext';

export default function Toggle({ changeToggle, toggleStatus }) {
  const theme = React.useContext(ThemeContext);

  const handleChange = (event) => {
    changeToggle();
  };

  return (
    <span className="toggle-area">
      Show Blanks
      <input
        type="checkbox"
        id="toggle"
        checked={toggleStatus}
        onChange={handleChange}
      />
    </span>
  );
}
