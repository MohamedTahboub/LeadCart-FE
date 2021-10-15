export default async ({ token: Authorization, contentType, method = 'GET', body = {}, uri }) => {
  try {
    let options = {};
    if (String(method).toLowerCase() !== 'get' && String(contentType).toLowerCase() === 'json') {
      options = {
        method,
        headers: {
          Authorization,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(body)
      };
    } else if (String(contentType).toLowerCase() === 'json' && String(method).toLowerCase() === 'get') {
      options = {
        method,
        headers: {
          Authorization,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      };
    } else {
      options = {
        method,
        headers: { Authorization },
        body
      };
    }

    const response = (await fetch(uri, options)).json();

    return response;
  } catch (err) {
    return { success: false, message: `Connection Error ${err.message}` };
  }
};

