export default async ({
  token: Authorization, contentType, method = 'GET', body = {}, uri
}) => {
  try {
    let options = {};
    if (contentType === 'json' && method !== 'get') {
      options = {
        method,
        headers: {
          Authorization,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(body)
      };
    } else if (contentType === 'json' && method === 'get') {
      options = {
        method,
        headers: {
          Authorization,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
      };
    } else {
      options = {
        method,
        headers: {
          Authorization,
        },
        body
      };
    }

    console.log('the request options =====', options);
    const response = (await fetch(uri, options)).json();

    return response;
  } catch (err) {
    return { success: false, message: 'Connection Error' };
  }
};

