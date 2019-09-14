/**
 * simple jwt validation
 * performs base64 decode and validate values
 * @param  {string} 	token 	JWT
 * @return {boolean}       		whether JWT is valid
 */
export const isValidJWT = token => {
	if (!token) return null;
	let base64Url;
	let base64;
	let data;

	try {
		base64Url = token.split(".")[1];
		base64 = base64Url.replace("-", "+").replace("_", "/");
		data = JSON.parse(window.atob(base64));
	} catch (err) {
		return false;
	}

	switch (true) {
		case data.role && data.role.length < 1:
		case Array.isArray(data.roles) && data.roles.length < 1:
		case data.exp * 1000 < new Date().getTime():
			return false;
		default:
		//do nothing
	}

	return true;
};
