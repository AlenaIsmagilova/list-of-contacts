import { baseUrl } from "../../constants/constants";

export const apiReq = () => {
  return fetch(`${baseUrl}/contacts`, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  });
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  });
};