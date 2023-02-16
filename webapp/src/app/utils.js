import axios from "axios";

export const ipfsBundleImage = "QmY3XC4Twr62QcMz2StdQZsrrffYKuyimscfM6acA6yCwf";
export const ipfsTicketImage = "Qmbw957mpvrK6ARp1Uq7taLYRCJaakuaw3p42bAZkPDv9Z";
export const fallbackNoImage = "https://wallet.unique.network/static/media/empty-image.06dd29a7fc6c895e8369e8f0bb5780b2.svg";

export const appMetadata = {
	name: "HONEYDOT",
    description: "A platform that allows brands to create engaging and unique loyalty programs",
    icon: "https://res.cloudinary.com/dy3hbcg2h/image/upload/v1652131690/dz-logo-black_c86gzb.png"
}

export const baseNetworkURL = "https://rest.unique.network/opal/v1"
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

// String base 64 to blob 
export const dataURItoBlob = (dataURI) => {
	var byteString = atob(dataURI.split(',')[1]);
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	
	for (var i = 0; i < byteString.length; i++) {
	  ia[i] = byteString.charCodeAt(i);
	}
	var blob = new Blob([ab], {type: mimeString});
	
	return [blob, mimeString];
}