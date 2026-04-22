import type { GithubContributor } from "../types";

export const pickRandomReviewer = (candidates: GithubContributor[]) => {
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex] ?? null;
};
