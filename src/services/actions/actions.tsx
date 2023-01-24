import { IContactsList } from "../../components/contacts/ContactsList";
import {
  AppDispatch,
  IUpdatedContactsList,
  TCurrentUser,
  TRegistrationUser,
  TUser,
} from "../../utils/types";
import {
  addContactApi,
  deleteContactApi,
  editContactApi,
  getContactsForUser,
  getCurrentUser,
  signInApi,
  signUpApi,
} from "../api/api";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const USER_LOGOUT = "USER_LOGOUT";

export const GET_CONTACTS_REQUEST = "GET_CONTACTS_REQUEST";
export const GET_CONTACTS_SUCCESS = "GET_CONTACTS_SUCCESS";
export const GET_CONTACTS_FAILED = "GET_CONTACTS_FAILED";

export const ADD_CONTACT_REQUEST = "ADD_CONTACT_REQUEST";
export const ADD_CONTACT_SUCCESS = "ADD_CONTACT_SUCCESS";
export const ADD_CONTACT_FAILED = "ADD_CONTACT_FAILED";

export const DELETE_CONTACT_REQUEST = "DELETE_CONTACT_REQUEST";
export const DELETE_CONTACT_SUCCESS = "DELETE_CONTACT_SUCCESS";
export const DELETE_CONTACT_FAILED = "DELETE_CONTACT_FAILED";

export const EDIT_CONTACT_REQUEST = "EDIT_CONTACT_REQUEST";
export const EDIT_CONTACT_SUCCESS = "EDIT_CONTACT_SUCCESS";
export const EDIT_CONTACT_FAILED = "EDIT_CONTACT_FAILED";

interface IEditConctactRequest {
  readonly type: typeof EDIT_CONTACT_REQUEST;
}

interface IEditConctactSuccess {
  readonly type: typeof EDIT_CONTACT_SUCCESS;
  readonly payload: IContactsList;
}

interface IEditContactFailed {
  readonly type: typeof EDIT_CONTACT_FAILED;
}

interface IDeleteConctactRequest {
  readonly type: typeof DELETE_CONTACT_REQUEST;
}

interface IDeleteConctactSuccess {
  readonly type: typeof DELETE_CONTACT_SUCCESS;
  readonly payload: IContactsList;
}

interface IDeleteContactFailed {
  readonly type: typeof DELETE_CONTACT_FAILED;
}

interface IAddContactRequest {
  readonly type: typeof ADD_CONTACT_REQUEST;
}

interface IAddContactSuccess {
  readonly type: typeof ADD_CONTACT_SUCCESS;
  readonly payload: IContactsList;
}

interface IAddContactFailed {
  readonly type: typeof ADD_CONTACT_FAILED;
}

interface IGetContactsRequest {
  readonly type: typeof GET_CONTACTS_REQUEST;
}
interface IGetContactsSuccess {
  readonly type: typeof GET_CONTACTS_SUCCESS;
  readonly payload: IContactsList;
}

interface IGetContactsFailed {
  readonly type: typeof GET_CONTACTS_FAILED;
}

interface IUserLogout {
  readonly type: typeof USER_LOGOUT;
}

interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}

interface IRegistrationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly payload: TRegistrationUser;
}

interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED;
}

interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TCurrentUser;
}

interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export type TRegistrationActions =
  | IRegistrationRequest
  | IRegistrationSuccess
  | IRegistrationFailed;

export type TLoginActions = ILoginRequest | ILoginSuccess | ILoginFailed;

export type TAllUserActions =
  | TRegistrationActions
  | TLoginActions
  | IUserLogout;

export type TAllContactsActions =
  | IGetContactsRequest
  | IGetContactsSuccess
  | IGetContactsFailed
  | IAddContactRequest
  | IAddContactSuccess
  | IAddContactFailed
  | IDeleteConctactRequest
  | IDeleteConctactSuccess
  | IDeleteContactFailed
  | IEditConctactRequest
  | IEditConctactSuccess
  | IEditContactFailed;

export type TAllActions = TAllContactsActions | TAllUserActions;

export const signUpThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: REGISTRATION_REQUEST });
    return signUpApi(email, password)
      .then((res) => {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ token: res.accessToken, userId: res.user.id })
        );
        dispatch({ type: REGISTRATION_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.error("Error in signUpApi", error);
        return dispatch({
          type: REGISTRATION_FAILED,
        });
      });
  };
};

export const signInThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST });
    return signInApi(email, password)
      .then((res) => {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ token: res.accessToken, userId: res.user.id })
        );
        dispatch({ type: LOGIN_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.error("Error in signInApi", error);
        return dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};

export const authThunk = (token: string, userId: number) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST });
    return getCurrentUser(token, userId)
      .then((res: TUser) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { accessToken: token, user: res },
        });
      })
      .catch((error) => {
        console.error("Error in getCurrentUserApi", error);
        return dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};

export const getContactsThunk = (token: string, userId: number) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_CONTACTS_REQUEST });
    return getContactsForUser(token, userId)
      .then((res) => {
        dispatch({ type: GET_CONTACTS_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.error("Error in getContactsForUser", error);
        return dispatch({
          type: GET_CONTACTS_FAILED,
        });
      });
  };
};

export const addContactThunk = (
  firstname: string,
  secondname: string,
  telNumber: string,
  token: string,
  userId: number
) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: ADD_CONTACT_REQUEST });
    return addContactApi(firstname, secondname, telNumber, token, userId)
      .then((res) => {
        dispatch({ type: ADD_CONTACT_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.error("Error in addContactApi", error);
        return dispatch({
          type: ADD_CONTACT_FAILED,
        });
      });
  };
};

export const deleteContactThunk = (contactId: number, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: DELETE_CONTACT_REQUEST });
    return deleteContactApi(contactId, token)
      .then((res) => {
        console.log(res);
        dispatch({
          type: DELETE_CONTACT_SUCCESS,
          payload: { id: contactId } as any,
        });
      })
      .catch((error) => {
        console.error("Error in deleteContactApi", error);
        return dispatch({
          type: DELETE_CONTACT_FAILED,
        });
      });
  };
};

export const editContactThunk = (
  contactId: number,
  token: string,
  contact: IContactsList
) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: EDIT_CONTACT_REQUEST });
    return editContactApi(contactId, token, contact)
      .then((res) => {
        console.log(res);
        dispatch({ type: EDIT_CONTACT_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.error("Error in deleteContactApi", error);
        return dispatch({
          type: EDIT_CONTACT_FAILED,
        });
      });
  };
};
