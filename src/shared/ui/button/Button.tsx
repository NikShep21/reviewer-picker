import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

import { Spinner } from "@/shared/ui/spinner";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export const Button = ({
  children,
  className,
  disabled,
  variant = "primary",
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(styles.button, styles[variant], className)}
      disabled={disabled || isLoading}
    >
      <span className={styles.content}>
        {isLoading && (
          <span className={styles.spinner}>
            <Spinner size={"md"} />
          </span>
        )}

        <span className={clsx(styles.label, isLoading && styles.labelHidden)}>
          {children}
        </span>
      </span>
    </button>
  );
};
