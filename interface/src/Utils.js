export const promiseLogger = (x) => {
   console.log( x );
   return x;
}

export const match = (regex, text) =>
  new RegExp( regex ).test( text )

export const toJson = (fetchResponse) =>
  fetchResponse.json()

export const find = (condition, array) => {
  return array.filter( condition )[0]
}

export const propEq = (name, value) => (obj) => obj[name] === value
