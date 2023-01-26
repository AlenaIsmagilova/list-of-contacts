import { FC } from "react";
import { useDispatch } from "react-redux";
import { deleteContactThunk } from "../../services/actions/actions";
import styles from "./ContactDeletingAgreement.module.css";

interface IContactDeletingAgreement {
  firstnameOfContact?: string;
  secondnameOfContact?: string;
  id: number;
  handleCloseClickOnBtn: () => void;
}

const ContactDeletingAgreement: FC<IContactDeletingAgreement> = ({
  firstnameOfContact,
  secondnameOfContact,
  id,
  handleCloseClickOnBtn,
}) => {
  const token = JSON.parse(localStorage.getItem("userInfo") as string)?.token;
  const dispatch = useDispatch();
  const handleUnagreedClick = () => {
    handleCloseClickOnBtn();
  };

  const handleAgreedClick = (contactId: number) => {
    handleCloseClickOnBtn();
    dispatch(deleteContactThunk(contactId, token));
  };
  return (
    <>
      <p className={styles.modalTitle}>
        Вы действительно хотите удалить контакт{" "}
        {`${firstnameOfContact} ${secondnameOfContact}`}?
      </p>
      <button
        className={styles.agreeButton}
        type="button"
        onClick={() => handleAgreedClick(id)}
      >
        Да
      </button>
      <button
        className={styles.agreeButton}
        type="button"
        onClick={handleUnagreedClick}
      >
        Нет
      </button>
    </>
  );
};

export default ContactDeletingAgreement;
