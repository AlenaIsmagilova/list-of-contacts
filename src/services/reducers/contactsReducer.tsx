import { IContactsList } from "../../components/contacts/ContactsList";
import {
  ADD_CONTACT_FAILED,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  TAllContactsActions,
} from "../actions/actions";
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
    case ADD_CONTACT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case ADD_CONTACT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        contacts: [...state.contacts, action.payload],
      };
    }
    case ADD_CONTACT_FAILED: {
      return {
        ...state,
        error: true,
      };
    }
    default:
      return state;
  }
};
