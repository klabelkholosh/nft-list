// function to fetch our list of NFTs from an eth address
export async function getNfts(address) {
  const web3ApiKey =
    'cxK7XtmeQjvhEOUWUR5d2XFk3CeWoSwoLtYCum6l3S0EQj9S0EtqObDARBhyEahP';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-Key': web3ApiKey,
    },
  };

  // first grab initial list of NFTs using Moralis service.
  const response = await fetch(
    `https://deep-index.moralis.io/api/v2/${address}/nft`,
    options
  );

  // throw an error if we got a bad
  if (!response.ok) {
    throw new Error();
  }

  // convert to json
  const jsonData = await response.json();

  // perform any additional manips on the data, ie. filling in missing metadata from token_uri, getting image type
  const manipData = async () => {
    // in order to assure we don't return anything without the correct metadata, make sure to grab anything with missing metadata from it's token_uri
    // to be returned in a Promise.all
    const promises = jsonData.result.map(async (el) => {
      if (el.metadata === null) {
        if (el.token_uri !== null) {
          await getTokenURIMetadata(el.token_uri).then((res) => {
            el.metadata = JSON.stringify(res);
          });
        }
      } else if (el.metadata.image !== null) {
        if (JSON.parse(el.metadata).image !== null) {
          return (
            // if we can't get the image type in 5 secs, don't let it hold up everything..
            Promise.race([
              imageType(JSON.parse(el.metadata).image),
              new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('Timeout')), 5000);
              }),
            ])
              .then((imageType) => {
                el.image_type = imageType;
                return el;
              })
              .catch((error) => {
                console.error(error);
                return el;
              })
          );
        }
      }

      return el;
    });

    // return it all
    const manipulatedData = await Promise.allSettled(promises);
    return manipulatedData.map((result) => result.value);
  };

  return manipData();
}

// grab metadata from an NFT's token_uri
async function getTokenURIMetadata(token_uri) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  const response = await fetch(`${token_uri}`, options);
  const jsonRes = await response.json();
  return jsonRes;
}

// grab image type (error otherwise)
async function imageType(ipfs_url) {
  let res;
  try {
    res = await fetch(ipfs_url, { method: 'HEAD' });
    res = res.headers.get('content-type');
  } catch (error) {
    res = error.message;
  }
  return res;
}
