import React from 'react';
import ThemeContext from '../contexts/ThemeContext';
import AddressInput from './AddressInput';

export default function MenuBar({ changeTheme, changeAddress, changeLoading }) {
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
    </span>
  );
}
