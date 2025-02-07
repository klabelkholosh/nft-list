import './App.css';
import NftList from './components/NftList';
import MenuBar from './components/MenuBar';
import React from 'react';
import lightUrl from './images/light-bg.jpeg';
import darkUrl from './images/dark-bg.jpeg';
import { ThemeProvider } from './contexts/ThemeContext';
import { getNfts } from './utils/api';

// initial state for reducer
const initialState = {
  address: '',
  loading: false,
  theme: 'light',
  nftList: null,
  showEmptys: false,
};

// using a reducer to handle state operations
function reducer(state, action) {
  // on initial load, load nfts from a sample eth address
  if (action.type === 'init') {
    return {
      ...state,
      loading: true,
      address: '0xD02cCc7f446522D0b84474f6FA13c226Cf2ACe24',
    };
    // on successful nft list load
  } else if (action.type === 'success') {
    return {
      ...state,
      loading: false,
      address: null,
      nftList: action.nftList,
    };
    // on error loading the above
  } else if (action.type === 'error') {
    return {
      ...state,
      nftList: null,
      loading: false,
      address: null,
    };
    // setting a generic state value
  } else if (action.type === 'setVal') {
    return {
      ...state,
      [action.name]: action.value,
    };
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // on address change, load NFTs from that address
  React.useEffect(() => {
    if (state.address) {
      const fetchNfts = async () => {
        await getNfts(state.address)
          .then((listRes) => {
            dispatch({
              type: 'success',
              nftList: listRes,
            });
          })
          .catch((err) => {
            dispatch({ type: 'error' });
          });
      };

      fetchNfts();
    } else {
      return;
    }

    return () => {
      dispatch({ type: 'setVal', name: 'address', value: null });
    };
  }, [state.address]);

  // on initial load, set address to sample address and load it up
  React.useEffect(() => {
    dispatch({ type: 'init' });
  }, []);

  // get body to change bg image on theme toggle
  React.useEffect(() => {
    document.body.style.backgroundImage = `url(${
      state.theme === 'light' ? lightUrl : darkUrl
    })`;
  }, [state.theme]);

  // used to change eth address, either to null or something sensible
  const changeAddress = (address) => {
    dispatch({ type: 'setVal', name: 'address', value: address });
  };

  // used to swap between light/dark theme
  const changeTheme = () =>
    dispatch({
      type: 'setVal',
      name: 'theme',
      value: state.theme === 'light' ? 'dark' : 'light',
    });

  // used to determine the state of loading we're in (true or false)
  const changeLoading = (loading) => {
    dispatch({ type: 'setVal', name: 'loading', value: loading });
  };

  // show emptys
  const changeToggle = () => {
    dispatch({ type: 'setVal', name: 'showEmptys', value: !state.showEmptys });
  };

  return (
    <ThemeProvider value={state.theme}>
      <span className="layout">
        <MenuBar
          changeTheme={changeTheme}
          changeAddress={changeAddress}
          changeLoading={changeLoading}
          changeToggle={changeToggle}
          toggleStatus={state.showEmptys}
        />
        <NftList
          nftList={state.nftList}
          loading={state.loading}
          showEmptys={state.showEmptys}
        />
      </span>
    </ThemeProvider>
  );
}
