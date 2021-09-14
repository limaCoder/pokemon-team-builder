import Modal from "react-modal";

import styles from './styles.module.scss'
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmitModal: (e: any) => void;
  onInputChangeModal: (e: any) => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export function ModalComponent({ onRequestClose, isOpen, onSubmitModal, onInputChangeModal }: ModalProps) {
  return(
    <Modal
     style={customStyles}
     isOpen={isOpen}
     onRequestClose={onRequestClose}
     >
      <h2 className={styles.modalTitle}>Create team name</h2>
      <button className={styles.closeButton} onClick={onRequestClose}>
        <FaTimes />
      </button>
      <form onSubmit={onSubmitModal}>
        <input onChange={onInputChangeModal} placeholder='Team Name' type='text' className={styles.inputTeamName} />
        <input type='submit' className={styles.createTeamName} />
      </form>
    </Modal>
  )
}