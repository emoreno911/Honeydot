import axios from "axios";

export const appMetadata = {
	name: "HONEYDOT",
    description: "A platform that allows brands to create engaging and unique loyalty programs",
    icon: "https://res.cloudinary.com/dy3hbcg2h/image/upload/v1652131690/dz-logo-black_c86gzb.png"
}

export const baseNetworkURL = "https://rest.unique.network/opal/v1"
export const graphqlEndpoint = "https://api-opal.uniquescan.io/v1/graphql";

export const backendBaseURL = (window.location.hostname === 'localhost') ? "http://localhost:5000" : process.env.REACT_APP_BACKEND_1;

export const request = async ({url, fname, method = 'GET', data = null, _baseURL = null}) => {
	const instance = axios.create();
	const baseURL = _baseURL || backendBaseURL;
	return instance.request({
		baseURL,
		url,
		method,
		data
	})
	.then(response => response.data)
	.catch(err => {
		const { message, response:{data, status} } = err;
		console.log(`request error in %c ${fname}`, 'font-weight:900');
		console.log(message);
		return { err: true, errmsg: message, ...data };
	})
}

export async function getAccountBalance(address) {
    const response = await request({
        _baseURL: backendBaseURL,
        url: `/getAccountBalance`,
        method: 'POST',
        fname: 'getAccountBalance',
        data: {address},
    });

    return response;
}