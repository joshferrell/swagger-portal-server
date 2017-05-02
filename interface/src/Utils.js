export const promiseLogger = (x) => {
   console.log( x );
   return x;
}

export const match = (regex, text) =>
  new RegExp( regex ).test( text )

export const toJson = (fetchResponse) =>
  fetchResponse.json()
