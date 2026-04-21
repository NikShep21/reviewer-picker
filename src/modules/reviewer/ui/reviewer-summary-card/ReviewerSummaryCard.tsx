import styles from "./ReviewerSummaryCard.module.css";

interface ReviewerSummaryCardProps {
  login: string;
  repository: string;
  blacklist: string[];
  maxVisibleUsers?: number;
}

export const ReviewerSummaryCard = ({
  login,
  repository,
  blacklist,
  maxVisibleUsers = 4,
}: ReviewerSummaryCardProps) => {
  const authorText = login ? `@${login}` : "не указан";
  const repositoryText = repository || "не указан";

  const visibleBlacklist = blacklist.slice(0, maxVisibleUsers);
  const remainingCount = blacklist.length - visibleBlacklist.length;

  return (
    <aside className={styles.card}>
      <div className={styles.section}>
        <p className={styles.label}>Текущий пользователь</p>
        <p className={styles.value}>{authorText}</p>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Репозиторий</p>
        <p className={styles.value}>{repositoryText}</p>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Список исключений</p>

        {visibleBlacklist.length ? (
          <div className={styles.tags}>
            {visibleBlacklist.map((user) => (
              <span key={user} className={styles.tag} title={`@${user}`}>
                @{user}
              </span>
            ))}

            {remainingCount ? <div className={styles.tag}>+{remainingCount}</div> : null}
          </div>
        ) : (
          <p className={styles.value}>Пусто</p>
        )}
      </div>
    </aside>
  );
};
