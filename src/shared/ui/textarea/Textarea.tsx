import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = ({ label, error, className, id, ...props }: TextareaProps) => {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <textarea id={id} className={clsx(styles.textarea, className)} {...props} />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
