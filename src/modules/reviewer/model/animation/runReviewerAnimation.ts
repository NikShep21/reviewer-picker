import type { Dispatch, SetStateAction } from "react";

import type { GithubContributor } from "../types";
import { buildAnimationFrames } from "./buildAnimationFrames";

interface RunReviewerAnimationParams {
  candidates: GithubContributor[];
  finalReviewer: GithubContributor;
  durationMs: number;
  intervalMs: number;
  setDisplayedReviewer: Dispatch<SetStateAction<GithubContributor | null>>;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
}

const delay = async (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

export const runReviewerAnimation = async ({
  candidates,
  finalReviewer,
  durationMs,
  intervalMs,
  setDisplayedReviewer,
  setIsAnimating,
}: RunReviewerAnimationParams) => {
  if (candidates.length === 1) {
    setDisplayedReviewer(finalReviewer);
    return;
  }

  const frames = buildAnimationFrames({
    candidates,
    finalReviewer,
    durationMs,
    intervalMs,
  });

  setIsAnimating(true);

  for (const reviewer of frames) {
    setDisplayedReviewer(reviewer);
    await delay(intervalMs);
  }

  setIsAnimating(false);
};
