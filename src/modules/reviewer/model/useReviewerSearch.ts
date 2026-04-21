import { useMemo, useState } from "react";

import { useLazyGetContributorsQuery } from "../api/getContributors";
import type { GithubContributor } from "./types";
import { preloadContributorsAvatars } from "./animation/preloadContributorsAvatars";
import { runReviewerAnimation } from "./animation/runReviewerAnimation";
import { getApiErrorMessage } from "./getApiErrorMessage";
import { filterCandidates } from "./reviewer/filterCandidates";
import { parseGithubRepository } from "./reviewer/parseGithubRepository";
import { pickRandomReviewer } from "./reviewer/pickRandomReviewer";

interface UseReviewerSearchParams {
  login: string;
  repository: string;
  blacklist: string[];
  durationMs?: number;
  intervalMs?: number;
}

export const useReviewerSearch = ({
  login,
  repository,
  blacklist,
  durationMs = 2400,
  intervalMs = 180,
}: UseReviewerSearchParams) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [displayedReviewer, setDisplayedReviewer] = useState<GithubContributor | null>(
    null,
  );
  const [isReviewerFound, setIsReviewerFound] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [localError, setLocalError] = useState("");

  const [trigger, { isFetching, error }] = useLazyGetContributorsQuery();

  const parsedRepository = useMemo(() => parseGithubRepository(repository), [repository]);

  const findReviewer = async () => {
    setHasStarted(true);
    setLocalError("");
    setIsReviewerFound(false);

    if (!login.trim() || !parsedRepository) {
      setDisplayedReviewer(null);
      setLocalError("Сначала сохраните корректные настройки.");
      return;
    }

    try {
      const contributors = await trigger(parsedRepository).unwrap();

      const candidates = filterCandidates({
        contributors,
        login,
        blacklist,
      });

      if (!candidates.length) {
        setDisplayedReviewer(null);
        setLocalError("После фильтрации не осталось кандидатов.");
        return;
      }

      const finalReviewer = pickRandomReviewer(candidates);

      await preloadContributorsAvatars(candidates);

      await runReviewerAnimation({
        candidates,
        finalReviewer,
        durationMs,
        intervalMs,
        setDisplayedReviewer,
        setIsAnimating,
      });

      setIsReviewerFound(true);
    } catch {
      setDisplayedReviewer(null);
    }
  };

  return {
    hasStarted,
    displayedReviewer,
    isReviewerFound,
    isLoading: isFetching || isAnimating,
    errorMessage: localError || getApiErrorMessage(error),
    findReviewer,
  };
};
