import { Button, Input } from "@mui/material";
import React, { FC, useState } from "react";
import styles from "./Contacts.module.css";

export interface IContactsList {
  firstname: string;
  secondname: string;
  phone_number: string;
}

export interface IContactsListProps {
  contacts: IContactsList[];
}

const ContactsList: FC<IContactsListProps> = ({ contacts }) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    telNumber: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return (
    <>
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
