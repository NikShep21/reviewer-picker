import type { GithubContributor } from "../types";

interface BuildAnimationFramesParams {
  candidates: GithubContributor[];
  finalReviewer: GithubContributor;
  durationMs: number;
  intervalMs: number;
}

export const buildAnimationFrames = ({
  candidates,
  finalReviewer,
  durationMs,
  intervalMs,
}: BuildAnimationFramesParams) => {
  const totalFrames = Math.max(Math.floor(durationMs / intervalMs), 1);
  const frames: GithubContributor[] = [];

  for (let index = 0; index < Math.max(totalFrames - 1, 0); index += 1) {
    frames.push(candidates[index % candidates.length]);
  }

  frames.push(finalReviewer);

  return frames;
};
