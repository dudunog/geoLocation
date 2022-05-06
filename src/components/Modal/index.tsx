import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface ModalProps {
  handleClose: any;
  show: boolean;
  children: ReactNode;
}

export function Modal({ handleClose, show, children }: ModalProps) {
  const showHideClassName = show ? `${styles.modal} ${styles.displayBlock}` : `${styles.modal} ${styles.displayNone}`;

  return (
    <div className={showHideClassName}>
      <section className={styles.modalMain}>
        {children}

        <button className={styles.button} type="button" onClick={handleClose}>
          Fechar
        </button>
      </section>
    </div>
  );
}
