import { Button, Input } from "@mui/material";
import React, { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Contacts.module.css";
import { USER_LOGOUT } from "../../services/actions/actions";

export interface IContactsList {
  id: number;
  firstname: string;
  secondname: string;
  phone_number: string;
  userId: number;
}

const ContactsList: FC = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    telNumber: "",
  });
  const isLogedIn = useSelector((store: any) => store.userReducer.isLogedIn);
  const contacts = useSelector((store: any) => store.contactsReducer.contacts);

  const dispatch = useDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
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
            { firstname, secondname, phone_number }: IContactsList,
            index: number
          ) => (
            <li key={index}>
              <div>
                <p>{firstname}</p>
                <p>{secondname}</p>
                <p>{phone_number}</p>
              </div>
            </li>
          )
        )}
      </ul>
      <form className={styles.form}>
        <Input
          name="name"
          placeholder="Введите имя"
          value={inputValue.name}
          onChange={handleInput}
        />
        <Input
          name="telNumber"
          placeholder="Введите номер телефона"
          value={inputValue.telNumber}
          onChange={handleInput}
        />
        <Button variant="contained">Добавить</Button>
        <Button variant="contained">Удалить</Button>
      </form>
    </>
  );
};

export default ContactsList;
