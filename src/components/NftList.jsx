import * as React from 'react';
import NftItem from './NftItem';
import Loading from './Loading';
import ThemeContext from '../contexts/ThemeContext';

export default function NftList({ nftList, loading, showEmptys }) {
  let theme = React.useContext(ThemeContext);

  return (
    <div className={`${theme} carousel-container`}>
      {loading === true ? (
        <Loading />
      ) : nftList !== null && nftList.length ? (
        <ul className="carousel-ul">
          {nftList.map((el, idx) => {
            try {
              let mdata = JSON.parse(el.metadata);

              let name =
                mdata === null
                  ? el.name
                  : typeof mdata.name === 'undefined' || mdata.name === null
                  ? el.name
                  : mdata.name;
              let series = el.name;
              let image =
                mdata === null
                  ? null
                  : mdata.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
              let desc = mdata === null ? null : mdata.description;
              let attr = mdata === null ? null : mdata.attributes;
              let type = el.image_type;

              return (
                <NftItem
                  name={name}
                  image={image}
                  desc={desc}
                  attr={attr}
                  series={series}
                  type={type}
                  showEmpty={showEmptys}
                  idx={idx}
                />
              );
            } catch (e) {
              console.log('undefined, skipping:', e);
            }
          })}
        </ul>
      ) : nftList !== null && nftList.length === 0 ? (
        <span>There doesn't seem to be any NFTs on this address to show.</span>
      ) : (
        <span>Please enter an ETH address</span>
      )}
    </div>
  );
}
