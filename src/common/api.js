const API_KEY = '9ff9d2f39bd02811ef9979c728238e0a';
const HASH = '76a825498a9afba1521653f41fcbaf75';
const TS = '1';

const BASE_URL = 'http://gateway.marvel.com/v1/public/comics';

const params = [
  { name: 'ts', value: TS },
  { name: 'apikey', value: API_KEY },
  { name: 'hash', value: HASH }
];

export const Api = async () => {
  let a = '?';
  params.map(i => {
    a = a + `&${i.name}=${i.value}`
  })
  return await fetch(BASE_URL + a)
};
