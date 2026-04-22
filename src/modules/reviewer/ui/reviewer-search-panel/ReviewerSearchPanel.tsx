import clsx from "clsx";
import { Button } from "@/shared/ui/button";
import type { GithubContributor } from "../../model/types";

import styles from "./ReviewerSearchPanel.module.css";

interface ReviewerSearchPanelProps {
  hasStarted: boolean;
  isLoading: boolean;
  error: string;
  displayedReviewer: GithubContributor | null;
  showGithubLink: boolean;
  onFindReviewer: () => void;
}

export const ReviewerSearchPanel = ({
  hasStarted,
  isLoading,
  error,
  displayedReviewer,
  showGithubLink,
  onFindReviewer,
}: ReviewerSearchPanelProps) => {
  const isInitialState = !hasStarted && !displayedReviewer && !error;

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Поиск ревьюера</h2>

        <Button onClick={onFindReviewer} isLoading={isLoading}>
          Найти ревьюера
        </Button>
      </div>

      <div className={styles.previewArea}>
        {error ? (
          <div className={styles.errorState}>
            <p className={styles.error}>{error}</p>
          </div>
        ) : displayedReviewer ? (
          <div className={styles.reviewerPreview}>
            <img
              className={clsx(styles.avatar, showGithubLink && styles.avatarFinal)}
              src={displayedReviewer.avatar_url}
              alt={displayedReviewer.login}
            />

            <p className={styles.login}>@{displayedReviewer.login}</p>

            <a
              className={clsx(styles.link, !showGithubLink && styles.hidden)}
              href={displayedReviewer.html_url}
              target="_blank"
              rel="noreferrer"
            >
              Открыть GitHub
            </a>
          </div>
        ) : isInitialState ? (
          <div className={styles.placeholder}>
            <div className={styles.avatarPlaceholder}>?</div>
            <p className={styles.namePlaceholder}>Имя ревьюера</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};
