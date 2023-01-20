import {
  AppDispatch,
  TCurrentUser,
  TRegistrationUser,
} from "../../utils/types";
import { getCurrentUser, signUpApi } from "../api/api";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const USER_LOGOUT = "USER_LOGOUT";

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

export type TAllActions =
  | IRegistrationRequest
  | IRegistrationSuccess
  | IRegistrationFailed
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | IUserLogout;

export const SignUpThunk = (email: string, password: string) => {
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

export const AuthThunk = (token: string, userId: number) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST });
    return getCurrentUser(token, userId)
      .then((res) => {
        console.log("2");
        dispatch({ type: LOGIN_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.error("Error in getCurrentUserApi", error);
        return dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};
