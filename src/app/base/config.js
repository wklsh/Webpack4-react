//google analytics
export const gaTrackingID = '';

let settings = {
	buyerURL: null,
	ownerURL: null,
	endpointURL: null,

	endpointCreds: null,
	facebookAppID: null,
	GoogleAppID: null,

	stripeEndpointURL: null,
	stripeAPIKey: null,
	googleMapsAPIKey: null
}
switch(process.env.NODE_ENV){
	case 'development':
	case 'staging':
		settings.buyerURL = '';
		settings.ownerURL = '';
		settings.endpointURL = "";	

		settings.endpointCreds = {username: '', password: ''};
		settings.facebookAppID = "";
		settings.GoogleAppID = "";

		//stripe
		settings.stripeEndpointURL = "";
		settings.stripeAPIKey = "";

		//google maps
		settings.googleMapsAPIKey = '';

	break
	case 'production':
		ssettings.buyerURL = '';
		settings.ownerURL = '';
		settings.endpointURL = "";	

		settings.endpointCreds = {username: '', password: ''};
		settings.facebookAppID = "";
		settings.GoogleAppID = "";

		//stripe
		settings.stripeEndpointURL = "";
		settings.stripeAPIKey = "";

		//google maps
		settings.googleMapsAPIKey = '';

	break
}

export const buyerURL = settings.buyerURL;
export const ownerURL = settings.ownerURL;
export const endpointURL = settings.endpointURL;
export const endpointCreds = settings.endpointCreds;
export const facebookAppID = settings.facebookAppID;
export const GoogleAppID = settings.GoogleAppID;
export const stripeEndpointURL = settings.stripeEndpointURL;
export const stripeAPIKey = settings.stripeAPIKey;
export const wpEndpointURL = settings.wpEndpointURL;
export const googleMapsAPIKey = settings.googleMapsAPIKey;