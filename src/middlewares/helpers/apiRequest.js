export default async ({
  token: Authorization, method = 'GET', body = {}, uri
}) => {
  try {
    const options = {
      method,
      headers: {
        Authorization,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(body)
    };
    const response = (await fetch(uri, options));
    console.log(response);
    return response.json();
  } catch (err) {
    console.log(err);
    return { success: false, message: 'Connection Error' };
  }
};

