import { TUser } from "../../utils/types";
import { TAllUserActions, USER_LOGOUT } from "../actions/actions";
import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../actions/actions";

export type TState = {
  isLoading: boolean;
  error: boolean;
  isLogedIn: boolean;
  accessToken: string | undefined;
  currentUser: TUser;
};

export const initialState: TState = {
  isLoading: false,
  error: false,
  isLogedIn: false,
  accessToken: "",
  currentUser: {
    email: "",
    id: 0,
  },
};

export const userReducer = (state = initialState, action: TAllUserActions) => {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: true,
        currentUser: {
          email: action.payload.user.email,
          id: action.payload.user.id,
        },
        accessToken: action.payload.accessToken,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: false,
        error: true,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: true,
        currentUser: {
          email: action.payload.user.email,
          id: action.payload.user.id,
        },
        accessToken: action.payload.accessToken,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: false,
        error: true,
      };
    }

    case USER_LOGOUT: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: false,
        accessToken: "",
        currentUser: {
          email: "",
          id: 0,
        },
      };
    }
    default:
      return state;
  }
};
