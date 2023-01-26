import { baseUrl } from "../../constants/constants";
import { IContactsList } from "../reducers/contactsReducer";

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.json());
};

export const apiReq = () => {
  return fetch(`${baseUrl}/contacts`, {
    method: "GET",
  }).then(checkResponse);
};

export const signUpApi = (email: string, password: string) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};

export const signInApi = (email: string, password: string) => {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};

export const getCurrentUser = (token: any, userId: number) => {
  return fetch(`${baseUrl}/600/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const getContactsForUser = (token: string, userId: number) => {
  return fetch(`${baseUrl}/600/contacts?userId=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const addContactApi = (
  firstname: string,
  secondname: string,
  telNumber: string,
  token: string,
  userId: number
) => {
  return fetch(`${baseUrl}/600/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstname: firstname,
      secondname: secondname,
      telNumber: telNumber,
      userId,
    }),
  }).then(checkResponse);
};

export const deleteContactApi = (contactId: number, token: string) => {
  return fetch(`${baseUrl}/600/contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const editContactApi = (
  contactId: number,
  token: string,
  contact: IContactsList
) => {
  return fetch(`${baseUrl}/600/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contact),
  }).then(checkResponse);
};
