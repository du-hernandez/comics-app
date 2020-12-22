const apiUrl = 'http://localhost:4000'
export class Api {

  post(url, data, formData) {
    let dataBody

    if (formData) {
      dataBody = new FormData();
      Object.keys(data).map(key => {

        if (!Array.isArray(data[key])) {
          const isFile = data[key] && data[key].size
          const isJson = typeof data[key] === 'object'

          dataBody.append(key, isFile || !isJson ? data[key] : JSON.stringify(data[key]));
        } else
          data[key].forEach(item => {
            const isFile = item && item.size
            const isJson = typeof item === 'object'

            dataBody.append(key, isFile || !isJson ? item : JSON.stringify(item))
          })
      })
    } else
      dataBody = JSON.stringify(data);

    return fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: (formData ? {
      } : {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        }),
      body: dataBody
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  put(url, data, formData) {
    let dataBody

    if (formData) {
      dataBody = new FormData();
      Object.keys(data).map(key => {

        if (!Array.isArray(data[key])) {
          const isFile = data[key] && data[key].size
          const isJson = typeof data[key] === 'object'

          dataBody.append(key, isFile || !isJson ? data[key] : JSON.stringify(data[key]));
        } else
          data[key].forEach(item => {
            const isFile = item && item.size
            const isJson = typeof item === 'object'

            dataBody.append(key, isFile || !isJson ? item : JSON.stringify(item))
          })
      })
    } else
      dataBody = JSON.stringify(data);

    return fetch(`${apiUrl}${url}`, {
      method: 'PUT',
      headers: (formData ? {
      } : {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }),
      body: dataBody
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  delete(url) {
    return fetch(`${apiUrl}${url}`, {
      method: 'DELETE'
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  get(url, params) {
    url = new URL(`${apiUrl}${url}`);
    if (params)
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url, {
      method: 'GET'
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }
}

export default new Api();