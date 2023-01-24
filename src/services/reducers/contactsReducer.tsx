import {
  ADD_CONTACT_FAILED,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILED,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  EDIT_CONTACT_FAILED,
  EDIT_CONTACT_REQUEST,
  EDIT_CONTACT_SUCCESS,
  TAllContactsActions,
} from "../actions/actions";
import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAILED,
} from "../actions/actions";

export interface IContactsList {
  id: number;
  firstname?: string;
  secondname?: string;
  telNumber?: string;
  userId?: number;
}

export type TState = {
  isLoading: boolean;
  error: boolean;
  contacts: IContactsList[];
};

export const initialState: TState = {
  isLoading: false,
  error: false,
  contacts: [] as IContactsList[],
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
    case DELETE_CONTACT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case DELETE_CONTACT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        contacts: [
          ...state.contacts.filter((el) => el.id !== action.payload.id),
        ],
      };
    }
    case DELETE_CONTACT_FAILED: {
      return {
        ...state,
        error: true,
      };
    }
    case EDIT_CONTACT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case EDIT_CONTACT_SUCCESS: {
      const updatedContactIndex = state.contacts.findIndex(
        (el) => el.id === action.payload.id
      );
      const contactsClone = [...state.contacts];
      contactsClone.splice(updatedContactIndex, 1, action.payload);
      return {
        ...state,
        isLoading: false,
        error: false,
        contacts: contactsClone,
      };
    }
    case EDIT_CONTACT_FAILED: {
      return {
        ...state,
        error: true,
      };
    }
    default:
      return state;
  }
};
