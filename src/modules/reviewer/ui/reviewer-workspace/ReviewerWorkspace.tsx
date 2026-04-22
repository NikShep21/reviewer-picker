import { ReviewerSearchPanel } from "../reviewer-search-panel/ReviewerSearchPanel";
import { ReviewerSummaryCard } from "../reviewer-summary-card/ReviewerSummaryCard";
import { useReviewerSearch } from "../../model/useReviewerSearch";

import styles from "./ReviewerWorkspace.module.css";

interface ReviewerWorkspaceProps {
  login: string;
  repository: string;
  blacklist: string[];
}

export const ReviewerWorkspace = ({
  login,
  repository,
  blacklist,
}: ReviewerWorkspaceProps) => {
  const {
    hasStarted,
    displayedReviewer,
    isReviewerFound,
    isLoading,
    errorMessage,
    findReviewer,
  } = useReviewerSearch({
    login,
    repository,
    blacklist,
  });

  return (
    <section className={styles.workspace}>
      <div className={styles.grid}>
        <div className={styles.mainColumn}>
          <ReviewerSearchPanel
            hasStarted={hasStarted}
            isLoading={isLoading}
            error={errorMessage}
            displayedReviewer={displayedReviewer}
            showGithubLink={isReviewerFound}
            onFindReviewer={findReviewer}
          />
        </div>

        <div className={styles.sideColumn}>
          <ReviewerSummaryCard
            login={login}
            repository={repository}
            blacklist={blacklist}
          />
        </div>
      </div>
    </section>
  );
};
