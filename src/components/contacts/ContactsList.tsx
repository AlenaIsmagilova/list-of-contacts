import { Button, Input } from "@mui/material";
import React, { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Contacts.module.css";
import { USER_LOGOUT, addContactThunk } from "../../services/actions/actions";
import ContactItem from "../contactItem/ContactItem";
import Spinner from "../spinner/Spinner";

export interface IContactsList {
  id: number;
  firstname?: string;
  secondname?: string;
  telNumber?: string;
  userId?: number;
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
  const { isLoading: contactsLoader } = useSelector(
    (store: any) => store.contactsReducer
  );
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
      {contactsLoader ? (
        <Spinner />
      ) : (
        <>
          <Button variant="outlined" onClick={handleClick}>
            Выйти из профиля
          </Button>
          <ul className={styles.itemsList}>
            {contacts.map(
              ({ firstname, secondname, telNumber, id }: IContactsList) => (
                <ContactItem
                  firstname={firstname}
                  secondname={secondname}
                  telNumber={telNumber}
                  id={id}
                />
              )
            )}
          </ul>
          <form className={styles.form}>
            <p>Добавить новый контакт в свой список контактов: </p>
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
          </form>
        </>
      )}
    </>
  );
};

export default ContactsList;
