import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { store } from "..";
import type {} from "redux-thunk/extend-redux";
import { TAllActions } from "../services/actions/actions";

export type TUser = {
  readonly email: string;
  readonly id: number;
};

export type TRegistrationUser = {
  readonly user: TUser;
  readonly accessToken: string | undefined;
};

export type TCurrentUser = {
  readonly accessToken: string;
  readonly user: TUser;
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TAllActions>
>;
