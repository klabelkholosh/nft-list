import * as React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import placeholder from '../images/crypto-placeholder.png';
import useHover from '../hooks/useHover';
import { SuspenseImg } from './SuspenseImg';
import Loading from './Loading';

export default function NftItem({
  name,
  image = placeholder,
  desc = name,
  attr = null,
  series = null,
  type = 'Failed',
}) {
  const [hovering, attrs] = useHover();

  // determine if we're looking at a video (or hopefully a picture...)
  let mp4type = /\.mp4$/g;
  let doVid = false;
  if (mp4type.test(image) || type.substring(0, 5).toLowerCase() === 'video') {
    doVid = true;
  }

  // if image is null, make it placeholder
  if (image === null) {
    image = placeholder;
  }

  return (
    <div className={hovering ? 'card card-hover' : 'card'} {...attrs}>
      {doVid === true ? (
        <video className="nftImg" controls>
          <source src={image} type="video/mp4" />
        </video>
      ) : (
        <React.Suspense fallback={<Loading />}>
          <SuspenseImg
            className="nftImg"
            src={image}
            alt={name}
            onError={({ currentTarget }) => {
              currentTarget.onError = null; // prevents looping
              currentTarget.src = placeholder;
            }}
          />
        </React.Suspense>
      )}

      <span className="card-text">
        <h1>{name}</h1>
        <article>
          <ReactMarkdown>{desc}</ReactMarkdown>
        </article>
        <ul>
          {attr !== null
            ? attr.length > 0
              ? attr.map((el, idx) => (
                  <li key={idx}>
                    <b>{el.trait_type}</b> : {el.value}
                  </li>
                ))
              : null
            : null}
        </ul>
        <footer>{series}</footer>
      </span>
    </div>
  );
}
