import clsx from "clsx";

import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Spinner = ({ size = "md", className }: SpinnerProps) => {
  return (
    <span className={clsx(styles.spinner, styles[size], className)} aria-hidden="true" />
  );
};
