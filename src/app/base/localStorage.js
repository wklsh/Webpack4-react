export const getPersistedState = () => {
	let persistedState = {authentication:[]}
	if(localStorage.getItem("offeoAccessToken")) persistedState.authentication[0] = {accessToken: localStorage.getItem("offeoAccessToken")}
	return persistedState
}
 
export const listenToStateChanges = (store) => {
	let states = store.getState(),
		prevAuth = states.authentication[states.authentication.length-2],
		latestAuth = states.authentication[states.authentication.length-1]
	if(prevAuth && latestAuth){
		if(prevAuth.loginStatus!=latestAuth.loginStatus || prevAuth.registerStatus!=latestAuth.registerStatus){
			switch (true==true){
					case latestAuth.loginStatus=="LOGIN_SUCCESS" && latestAuth.loginRemember && latestAuth.accessToken.length>10:
					case latestAuth.loginStatus=="FACEBOOK_REGISTER_SUCCESS"  && latestAuth.accessToken.length>10:
					case latestAuth.registerStatus=="FACEBOOK_REGISTER_SUCCESS"  && latestAuth.accessToken.length>10:
					case latestAuth.loginStatus=="GOOGLE_REGISTER_SUCCESS"  && latestAuth.accessToken.length>10:
					case latestAuth.registerStatus=="GOOGLE_REGISTER_SUCCESS"  && latestAuth.accessToken.length>10:
						localStorage.setItem("offeoAccessToken", latestAuth.accessToken)
					break
					case latestAuth.loginStatus=="LOGOUT":
						localStorage.removeItem("offeoAccessToken")
					break
			}
		}
	}
}
 
 