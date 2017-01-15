import fetch from 'isomorphic-fetch'
import { passwordResetSent,
        newPasswordSent,
        newUserConfirmationSent,
        userConfirmed,
        loginSent,
        signupSent,
        userUpdateSent,
        userDeletionSent,
        searchDataSent,
        addLocationSent,
        removeLocationSent,
        requestReceivedByServer,
        receivedUserDataAfterRequest,
        reportServerError,
        receiveSearchResults,
        resetLoginSent,
        resetAddLocationSent,
        resetRemoveLocationSent,
        confirmAddLocation,
        confirmRemoveLocation,
        resetSignupSent,
        persistUserData,
        resetSearchDataSent,
        resetUserUpdateSent } from '../actions/actions'

const API_URL = "http://localhost:3000"
const methods = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

export const dataService = store => next => action => {
  let user = store.getState().user
  let headers = new Headers({
    "content-type": "application/json"
  })
  let fetchParams = {
    method: methods.GET,
    headers: headers
  }
  next(action)
  switch(action.type) {
    case "REQUEST_PASSWORD_RESET":
      store.dispatch(passwordResetSent())
      fetch(`${API_URL}/password_resets`, {...fetchParams, method: methods.POST })
        .then(response => store.dispatch(requestReceivedByServer()))
        .catch(error => store.dispatch(reportServerError(error)))
      break
    case "SEND_RESET_PASSWORD":
      store.dispatch(newPasswordSent())
      fetch(`${API_URL}/password_resets`, {...fetchParams, method: methods.PATCH })
        .then(response => response.json())
        .then(userData => {
          store.dispatch(resetSentPassword())
          return store.dispatch(receivedUserDataAfterRequest(userData))
        })
        .catch(error => store.dispatch(reportServerError(error)))
      break
    case "SEND_USER_CONFIRMATION":
      headers.set("authorization", user.token)
      store.dispatch(newUserConfirmationSent())
      fetch(`${API_URL}/api/v1/user_confirmation/${user.id}`, {...fetchParams, headers: headers })
        .then(response => {
          if(response.ok) {
            store.dispatch(requestReceivedByServer())
          } else {
            reportServerError("Confirmation not sent")
          }
        })
        .catch(error => store.dispatch(reportServerError(error)))
      break
    case "CONFIRM_USER":
      store.dispatch(userConfirmed())
      fetch(`${API_URL}/api/v1/user_confirmation/${action.payload.userid}`, {...fetchParams, method: methods.PATCH })
        .then(response => store.dispatch(requestReceivedByServer()))
        .catch(error => store.dispatch(reportServerError(error)))
      break
    case "LOGIN":
      store.dispatch(loginSent())
      fetch(`${API_URL}/api/v1/tokens`, {...fetchParams, method: methods.POST, body: action.payload })
        .then(handleResponse)
        .then(userData => {
          store.dispatch(resetLoginSent())
          store.dispatch(persistUserData(userData))
          return store.dispatch(receivedUserDataAfterRequest(userData))
        }, error => store.dispatch(reportServerError(error)))
      break
    case "SIGNUP":
      store.dispatch(signupSent())
      fetch(`${API_URL}/api/v1/users`, {...fetchParams, method: methods.POST, body: action.payload })
        .then(handleResponse)
        .then(userData => {
          store.dispatch(resetSignupSent())
          store.dispatch(persistUserData(userData))
          return store.dispatch(receivedUserDataAfterRequest(userData))
        }, error => store.dispatch(reportServerError(error)))
        .catch(error => store.dispatch(reportServerError(error)))
      break
    case "UPDATE_USER_PROFILE":
      headers.set("authorization", user.token)
      store.dispatch(userUpdateSent())
      fetch(`${API_URL}/api/v1/users/${action.payload.id}`, {...fetchParams, method: methods.PATCH, body: action.payload.updatedInfo, headers: headers })
        .then(handleResponse)
        .then(userData => {
          store.dispatch(resetUserUpdateSent())
          store.dispatch(persistUserData(userData))
          return store.dispatch(receivedUserDataAfterRequest(userData))
        }, error => store.dispatch(reportServerError(error)))
        .catch(error => store.dispatch(reportServerError(error)))
      break
    case "DELETE_USER":
      store.dispatch(userDeletionSent())
      fetch(`${API_URL}/api/v1/users/${action.payload.id}`, {...fetchParams, method: methods.DELETE })
        .then(response => store.dispatch(requestReceivedByServer()))
        .catch(error => store.dispatch(reportServerError(error)))
      break
    case "SEND_UNAUTHENTICATED_SEARCH_DATA":
      store.dispatch(searchDataSent())
      fetch(`${API_URL}/api/v1/searches`, {...fetchParams, method: methods.POST, body: action.payload})
        .then(handleResponse)
        .then(results => {
          store.dispatch(resetSearchDataSent())
          return store.dispatch(receiveSearchResults(results))
        }, error => store.dispatch(reportServerError(error)))
        .catch(error => store.dispatch(reportServerError(error)))
      break
    case "SEND_AUTHENTICATED_SEARCH_DATA":
      store.dispatch(searchDataSent())
      headers.set("authorization", user.token)
      fetch(`${API_URL}/api/v1/searches`, {...fetchParams, method: methods.POST, body: action.payload, headers: headers})
        .then(handleResponse)
        .then(results => {
          store.dispatch(resetSearchDataSent())
          return store.dispatch(receiveSearchResults(results))
        }, error => store.dispatch(reportServerError(error)))
        .catch(error => store.dispatch(reportServerError(error)))
      break
    case "ADD_LOCATION_TO_USER":
      store.dispatch(addLocationSent())
      headers.set("authorization", user.token)
      fetch(`${API_URL}/api/v1/plans`, {...fetchParams, method: methods.POST, headers: headers, body: action.payload.updateData })
        .then(handleResponse)
        .then(response => {
          store.dispatch(resetAddLocationSent())
          return store.dispatch(confirmAddLocation(response.plans))
        }, error => store.dispatch(reportServerError(error)))
        .catch(error => store.dispatch(reportServerError(error)))
      break
    case "REMOVE_LOCATION_FROM_USER":
      store.dispatch(removeLocationSent())
      headers.set("authorization", user.token)
      fetch(`${API_URL}/api/v1/plans/${action.payload.id}`, {...fetchParams, method: methods.DELETE, headers: headers })
        .then(handleResponse)
        .then(response => {
          store.dispatch(resetRemoveLocationSent())
          return store.dispatch(confirmRemoveLocation(response.plans))
        }, error => store.dispatch(reportServerError(error)))
        .catch(error => store.dispatch(reportServerError(error)))
      break
    default:
     break
  }
}

function handleResponse(response){
  if(response.ok) {
    return response.json()
  } else {
    throw {status: response.status, message: response.statusText}
  }
}