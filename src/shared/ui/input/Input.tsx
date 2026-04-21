import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className, id, ...props }: InputProps) => {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input id={id} className={clsx(styles.input, className)} {...props} />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
