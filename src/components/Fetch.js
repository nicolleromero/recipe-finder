
const APP_ID = "";
const APP_KEY = "";
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const SEARCH_URL = 'https://api.edamam.com/search?q=';

function memoize(fn) {
  const cache = Object.create(null);

  return (...args) => {
    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;

    if (
      result != null &&
      typeof result === 'object' &&
      typeof result.then === 'function'
    ) {
      result.then(null, () => {
        console.warn('Ejecting from memoize cache:', key);
        delete cache[key];
      });
    }

    return result;
  };
}

export const getList = memoize(async (term) => {
  const url = SEARCH_URL + encodeURIComponent(term);
  const proxiedUrl = PROXY_URL + url + "&app_id=" + APP_ID + "&app_key=" + APP_KEY;
  const response = await fetch(proxiedUrl);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    console.error(message);
    throw new Error(message);
  }

  const data = await response.json();

  return data.hits.map((item) => {
    return {
      id: item.recipe.uri,
      title: item.recipe.label,
      image: item.recipe.image,
      ingredients: item.recipe.ingredientLines,
    };
  });
});
