import { FC } from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
  children: any;
  onClick: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ children, onClick }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClick}>
      {children}
    </div>
  );
};

export default ModalOverlay;
