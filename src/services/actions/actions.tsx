import { IContactsList } from "../../components/contacts/ContactsList";
import {
  AppDispatch,
  TCurrentUser,
  TRegistrationUser,
  TUser,
} from "../../utils/types";
import {
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
  | IGetContactsFailed;

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
