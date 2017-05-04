export const promiseLogger = (x) => {
    console.log(x);
    return x;
};

export const match = (regex, text) =>
    new RegExp(regex).test(text);

export const toJson = (fetchResponse) =>
  fetchResponse.json()

export const find = (condition, array) => {
  return array.filter( condition )[0]
}

export const checkResults = (text, apis) => {
    const result = [];
    for (let i = 0; i < apis.length; i += 1) {
        if (apis[i].title.indexOf(text) !== -1) {
            result.push(apis[i]);
        }
    }

    return result;
};

//
// export const checkResults = (text, apis) =>
//     apis.filter(api => api.title.indexOf(text) === 0);

export const propEq = (name, value) => (obj) => obj[name] === value
