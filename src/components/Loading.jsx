import React from 'react';
import ThemeContext from '../contexts/ThemeContext';

export default function Loading() {
  const theme = React.useContext(ThemeContext);

  return (
    <div className={`lds-roller-${theme} lds-roller`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
