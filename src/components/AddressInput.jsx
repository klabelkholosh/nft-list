import * as React from 'react';
import { Logo } from './Logo';
import ThemeContext from '../contexts/ThemeContext';

export default function AddressInput({ changeAddress, changeLoading }) {
  const [localAddr, changeLocalAddr] = React.useState(null);
  const theme = React.useContext(ThemeContext);

  const handleChange = (event) => {
    changeLocalAddr(event.target.value);
  };

  const handleClick = () => {
    changeLoading(true);
    changeAddress(localAddr);
  };

  return (
    <span className="address-area">
      <h4>
        <Logo height={'35px'} fillclr={theme === 'light' ? 'black' : 'white'} />
      </h4>
      <pre> </pre>
      <input
        type="text"
        id="address"
        className="input-light"
        placeholder="enter eth address"
        autoComplete="off"
        onChange={handleChange}
      />
      <button
        className="btn secondary"
        onClick={() => handleClick()}
        disabled={!localAddr}
      >
        Load items
      </button>
    </span>
  );
}
