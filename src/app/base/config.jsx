const settings = {
  endpointDomain: null,
  endpointVersion: null,
  baseEndpointURL: null,
  endpointURL: null,
  endpointCreds: null,
};

switch (process.env.NODE_ENV) {
  case 'development':
    settings.endpointDomain = 'http://api-staging.com/';
    settings.endpointVersion = 'v1';
    settings.baseEndpointURL = `${settings.endpointDomain}${settings.endpointVersion}/api/`;
    settings.endpointLogin = 'username';
    settings.endpointPassword = 'password';
    settings.endpointCreds = `Basic ${btoa(
      `${settings.endpointLogin}:${settings.endpointPassword}`
    )}`;
    break;

  case 'staging':
    settings.endpointDomain = 'http://api-staging.com/';
    settings.endpointVersion = 'v1';
    settings.baseEndpointURL = `${settings.endpointDomain}${settings.endpointVersion}/api/`;
    settings.endpointLogin = 'username';
    settings.endpointPassword = 'password';
    settings.endpointCreds = `Basic ${btoa(
      `${settings.endpointLogin}:${settings.endpointPassword}`
    )}`;
    break;

  case 'production':
    settings.endpointDomain = 'http://api-production.com/';
    settings.endpointVersion = 'v1';
    settings.baseEndpointURL = `${settings.endpointDomain}${settings.endpointVersion}/api/`;
    settings.endpointLogin = 'username';
    settings.endpointPassword = 'password';
    settings.endpointCreds = `Basic ${btoa(
      `${settings.endpointLogin}:${settings.endpointPassword}`
    )}`;
    break;

  default:
  // do nothing
}

export const {
  endpointDomain,
  endpointVersion,
  baseEndpointURL,
  endpointURL,
  endpointCreds,
} = settings;
