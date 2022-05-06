import styles from './styles.module.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

export function Button({ onClick, text }: ButtonProps) {
  return (
    <button
      role="button"
      onClick={onClick}
      className={`${styles.button} ${text.toLocaleLowerCase() == "editar" ? styles.editButton : styles.viewButton}`}
    >
      {text}
    </button>
  )
}
