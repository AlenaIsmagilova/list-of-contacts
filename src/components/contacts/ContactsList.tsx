import { Button, Input } from "@mui/material";
import React, { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Contacts.module.css";
import {
  USER_LOGOUT,
  getContactsThunk,
  addContactThunk,
} from "../../services/actions/actions";

export interface IContactsList {
  id: number;
  firstname: string;
  secondname: string;
  telNumber: string;
  userId: number;
}

const ContactsList: FC = () => {
  const [inputValue, setInputValue] = useState({
    firstname: "",
    secondname: "",
    telNumber: "",
  });
  const isLogedIn = useSelector((store: any) => store.userReducer.isLogedIn);
  const contacts = useSelector((store: any) => store.contactsReducer.contacts);
  const token = JSON.parse(localStorage.getItem("userInfo") as string)?.token;
  const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId;

  const dispatch = useDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
  };

  const handleAddClick = () => {
    dispatch(
      addContactThunk(
        inputValue.firstname,
        inputValue.secondname,
        inputValue.telNumber,
        token,
        userId
      )
    );
    setInputValue({ firstname: "", secondname: "", telNumber: "" });
  };

  if (!isLogedIn) {
    return <Redirect to={{ pathname: "/signup" }} />;
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>
        Выйти из профиля
      </Button>
      <ul>
        {contacts.map(
          (
            { firstname, secondname, telNumber }: IContactsList,
            index: number
          ) => (
            <li key={index}>
              <div>
                <p>{firstname}</p>
                <p>{secondname}</p>
                <p>{telNumber}</p>
              </div>
            </li>
          )
        )}
      </ul>
      <form className={styles.form}>
        <Input
          name="firstname"
          placeholder="Введите имя"
          value={inputValue.firstname}
          onChange={handleInput}
        />
        <Input
          name="secondname"
          placeholder="Введите фамилию"
          value={inputValue.secondname}
          onChange={handleInput}
        />
        <Input
          name="telNumber"
          placeholder="Введите номер телефона"
          value={inputValue.telNumber}
          onChange={handleInput}
        />
        <Button variant="contained" onClick={handleAddClick}>
          Добавить
        </Button>
        <Button variant="contained">Удалить</Button>
      </form>
    </>
  );
};

export default ContactsList;
