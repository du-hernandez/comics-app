const API_KEY = '9ff9d2f39bd02811ef9979c728238e0a';
const HASH = '76a825498a9afba1521653f41fcbaf75';
const TS = '1';

// // const BASE_URL = 'http://gateway.marvel.com/v1/public/comics';

// // const params = [
// //   { name: 'ts', value: TS },
// //   { name: 'apikey', value: API_KEY },
// //   { name: 'hash', value: HASH }
// // ];

// // export const Api = async () => {
// //   let a = '?';
// //   params.map(i => {
// //     a = a + `&${i.name}=${i.value}`
// //   })
// //   return await fetch(BASE_URL + a)
// // };


// class Api {
//   constructor() {
//     this.API_TOKEN = null;
//     this.CLIENT = null;
//     this.BASE_URL = process.env.REACT_APP_API_ENDPOINT;
//   }

//   init = () => {
//     // this.API_TOKEN = getCookie("ACCESS_TOKEN"); 
//     let headers = {
//       Accept: "application/json",
//     };

//     if (this.API_TOKEN) {
//       headers.Authorization = `Bearer ${this.API_TOKEN}`;
//     }

//     this.CLIENT = axios.create({
//       baseURL: this.BASE_URL,
//       timeout: 31000,
//       headers: headers,
//     });

//     return this.CLIENT;
//   }

//   getComics = (params) => {
//     return this.init().get("/", {
//       params: {
//         ts: TS,
//         apikey: API_KEY,
//         hash: HASH
//     } });
//   };
  
// }

// const api = new Api();

// export default api;

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