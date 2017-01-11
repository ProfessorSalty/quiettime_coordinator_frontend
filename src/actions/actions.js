/****************************
*     UI Changes            *
****************************/

export const passwordResetSent = () => ({ type: "PASSWORD_RESET_SENT"});
export const newPasswordSent = () => ({ type: "NEW_PASSWORD_SENT" });
export const newUserConfirmationSent = () => ({ type: "USER_CONFIRMATION_REQUESTED" });
export const userConfirmed = () => ({ type: "USER_CONFIRMED" });
export const loginSent = () => ({ type: "LOGIN_SENT" });
export const signupSent = () => ({ type: "SIGNUP_SENT" });
export const userUpdateSent = () => ({ type: "USER_UPDATE_SENT" });
export const userDeletionSent = () => ({ type: "USER_DELETION_SENT" });
export const searchDataSent = () => ({ type: "SEARCH_DATA_SENT" });
export const addLocationSent = () => ({ type: "ADD_LOCATION_SENT" });
export const removeLocationSent = () => ({ type: "REMOVE_LOCATION_SENT" });
export const requestReceivedByServer = () => ({ type: "REQUEST_RECEIVED_BY_SERVER" });
export const resetSentPassword = () => ({ type: "RESET_SENT_PASSWORD" });
export const resetLoginSent = () => ({ type: "RESET_LOGIN_SENT" });
export const resetSignupSent = () => ({ type: "RESET_SIGNUP_SENT" });
export const resetUserUpdateSent = () => ({ type: "RESET_USER_UPDATE_SENT" });
export const resetAddLocationSent = () => ({ type: "RESET_ADD_LOCATION_SENT" });
export const resetRemoveLocationSent = () => ({ type: "RESET_REMOVE_LOCATION_SENT" });

/****************************
*   Middleware Invocations  *
****************************/

export const sendResetPassword = () => ({ type: "SEND_RESET_PASSWORD"});
export const sendUserConfirmation = () => ({ type: "SEND_USER_CONFIRMATION"});
export const confirmUser = () => ({ type: "CONFIRM_USER"});
export const login = credentials => ({ type: "LOGIN", payload: credentials});
export const signup = () => ({ type: "SIGNUP"});
export const updateUserProfile = data => ({ type: "UPDATE_USER_PROFILE", payload: data});
export const deleteUser = data => ({ type: "DELETE_USER", payload: data});
export const sendSearchData = searchParameters => ({ type: "SEND_SEARCH_DATA", payload: searchParameters});
export const addLocationToUser = data => ({ type: "ADD_LOCATION_TO_USER", payload: data});
export const removeLocationFromUser = data => ({ type: "REMOVE_LOCATION_FROM_USER", payload: data});

/****************************
*  Middleware Responses     *
****************************/

export const receivedUserDataAfterRequest = userData => ({ type: "RECEIVE_USER_DATA", payload: userData});
export const reportServerError = error => ({ type: "REPORT_SERVER_ERROR", payload: error});
export const receiveSearchResults = results => ({ type: "RECEIVE_SEARCH_RESULTS", payload: results});
export const requestPasswordReset = () => ({ type: "REQUEST_PASSWORD_RESET"});