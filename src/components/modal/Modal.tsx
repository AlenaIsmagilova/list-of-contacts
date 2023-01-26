import ModalOverlay from "../modalOverlay/ModalOverlay";
import closeButton from "../../images/Vector.svg";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteContactThunk } from "../../services/actions/actions";

interface IModalProps {
  open: boolean;
  handleClose: () => void;
  children: any;
}

const ModalRoot: any = document.getElementById("react-modals");

const Modal: FC<IModalProps> = ({ open, handleClose, children }) => {
  const closeOnEscKey = (e: any) => (e.key === "Escape" ? handleClose() : null);

  useEffect(() => {
    window.addEventListener("keydown", closeOnEscKey);
    return () => {
      window.removeEventListener("keydown", closeOnEscKey);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      {open && (
        <ModalOverlay onClick={handleClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.closeBtnWrapper} onClick={handleClose}>
              <img
                className={styles.closeIcon}
                src={closeButton}
                alt="кнопка закрытия"
              />
              <div className={styles.modalContent}>{children}</div>
            </div>
          </div>
        </ModalOverlay>
      )}
    </>,
    ModalRoot
  );
};
export default Modal;
