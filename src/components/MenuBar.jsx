import React from 'react';
import ThemeContext from '../contexts/ThemeContext';
import AddressInput from './AddressInput';
import Toggle from './Toggle';

export default function MenuBar({
  changeTheme,
  changeAddress,
  changeLoading,
  changeToggle,
  toggleStatus,
}) {
  const theme = React.useContext(ThemeContext);

  return (
    <span className={`${theme} menuBar`}>
      <button className="btn-clear" onClick={changeTheme}>
        {theme === 'light' ? '🔦' : '💡'}
      </button>
      <AddressInput
        changeAddress={changeAddress}
        changeLoading={changeLoading}
      />
      <Toggle changeToggle={changeToggle} toggleStatus={toggleStatus} />
    </span>
  );
}
