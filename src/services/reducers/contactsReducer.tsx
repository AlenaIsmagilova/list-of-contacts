import { IContactsList } from "../../components/contacts/ContactsList";
import { TAllContactsActions } from "../actions/actions";
import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAILED,
} from "../actions/actions";

export type TState = {
  isLoading: boolean;
  error: boolean;
  contacts: IContactsList[];
};

export const initialState: TState = {
  isLoading: false,
  error: false,
  contacts: [],
};

export const contactsReducer = (
  state = initialState,
  action: TAllContactsActions
) => {
  switch (action.type) {
    case GET_CONTACTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_CONTACTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        contacts: action.payload,
      };
    }
    case GET_CONTACTS_FAILED: {
      return {
        ...state,
        error: true,
      };
    }
    default:
      return state;
  }
};
