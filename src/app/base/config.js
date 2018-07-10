let settings = {
	endpointLogin: null,
	endpointPassword: null,
	endpointAuth: null,
	endpointURL: null,
	gMapsToken: null
};

switch (process.env.NODE_ENV) {
	case "development":
		settings.endpointLogin = "loginID";
		settings.endpointPassword = "password";
		settings.endpointAuth = "Basic " + btoa(settings.endpointLogin + ":" + settings.endpointPassword);
		settings.endpointURL = "https://api.openweathermap.org";
		settings.gMapsToken = "";
		break;
	case "staging":
		settings.endpointLogin = "";
		settings.endpointPassword = "";
		settings.endpointAuth = "";
		settings.endpointURL = "";
		settings.gMapsToken = "";
		break;
	case "production":
		settings.endpointLogin = "";
		settings.endpointPassword = "";
		settings.endpointAuth = "";
		settings.endpointURL = "";
		settings.gMapsToken = "";
		break;
}

export const endpointLogin = settings.endpointLogin;
export const endpointPassword = settings.endpointPassword;
export const endpointAuth = settings.endpointAuth;
export const endpointURL = settings.endpointURL;
export const gMapsToken = settings.gMapsToken;
