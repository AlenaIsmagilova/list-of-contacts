import { IconButton, Input, Button } from "@mui/material";
import { Edit as EditIcon } from "@material-ui/icons";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { FC, useState } from "react";
import { IContactsList } from "../contacts/ContactsList";
import { useDispatch } from "react-redux";
import {
  deleteContactThunk,
  editContactThunk,
} from "../../services/actions/actions";

interface IContactItemProps extends IContactsList {}

const ContactItem: FC<IContactItemProps> = ({
  firstname,
  secondname,
  telNumber,
  id,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState<{
    [key: string]: string | undefined;
  }>({
    firstname: "",
    secondname: "",
    telNumber: "",
  });
  const token = JSON.parse(localStorage.getItem("userInfo") as string)?.token;
  const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId;
  const dispatch = useDispatch();

  const hadleDeleteClick = (contactId: number) => {
    dispatch(deleteContactThunk(contactId, token));
  };

  const handleEditClick = () => {
    setIsEdit(true);
    setInputValue({
      firstname,
      secondname,
      telNumber,
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSaveChangesClick = () => {
    dispatch(
      editContactThunk(id, token, {
        id: id,
        firstname: inputValue.firstname,
        secondname: inputValue.secondname,
        telNumber: inputValue.telNumber,
        userId: userId,
      })
    );
    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <>
          <li key={id}>
            <div>
              <Input
                name="firstname"
                value={inputValue.firstname}
                onChange={handleInput}
              />
              <Input
                name="secondname"
                value={inputValue.secondname}
                onChange={handleInput}
              />
              <Input
                name="telNumber"
                value={inputValue.telNumber}
                onChange={handleInput}
              />
            </div>
          </li>
          <Button onClick={() => handleSaveChangesClick()} variant="outlined">
            Сохранить изменения
          </Button>
          <Button
            onClick={() => setIsEdit(false)}
            variant="outlined"
            color="secondary"
          >
            Отменить изменения
          </Button>
        </>
      ) : (
        <>
          <li key={id}>
            <div>
              <p>{firstname}</p>
              <p>{secondname}</p>
              <p>{telNumber}</p>
            </div>
          </li>
          <IconButton
            color="primary"
            aria-label="edit contact"
            onClick={() => {
              handleEditClick();
            }}
          >
            <EditIcon></EditIcon>
          </IconButton>
          <IconButton
            color="primary"
            aria-label="delete contact"
            onClick={() => {
              hadleDeleteClick(id);
            }}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </>
      )}
    </>
  );
};

export default ContactItem;
