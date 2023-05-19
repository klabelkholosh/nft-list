// using an image cache to store already-loaded images, just in case we try
// to reload the same address multiple times
const imgCache = {
  __cache: {},
  read(src) {
    if (!this.__cache[src]) {
      this.__cache[src] = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.__cache[src] = true;
          resolve(this.__cache[src]);
        };
        img.onerror = (error) => {
          this.__cache[src] = error;
          reject(error);
        };
        img.src = src;
      });
    }
    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src];
    }
    if (this.__cache[src] instanceof Error) {
      throw this.__cache[src];
    }
    return this.__cache[src];
  },
};

// using React.Suspense to have an elegantly loading image
export const SuspenseImg = ({ src, ...rest }) => {
  imgCache.read(src);
  return <img alt="" src={src} {...rest} />;
};
