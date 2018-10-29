export default async ({ method = 'GET', body = {}, uri }) => {
    try {
        const options = {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify(body)
        }
        const response = (await fetch(uri, options)).json();
        return response
    } catch (err) {
        return { success: false, message: 'Connection Error' }
    }
}