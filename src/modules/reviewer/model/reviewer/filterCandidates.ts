import type { GithubContributor } from "../types";

interface FilterCandidatesParams {
  contributors: GithubContributor[];
  login: string;
  blacklist: string[];
}

export const filterCandidates = ({
  contributors,
  login,
  blacklist,
}: FilterCandidatesParams) => {
  const normalizedLogin = login.toLowerCase();
  const blacklistSet = new Set(
    blacklist.map((blacklistedLogin) => blacklistedLogin.toLowerCase()),
  );

  return contributors.filter((contributor) => {
    const contributorLogin = contributor.login.toLowerCase();

    return contributorLogin !== normalizedLogin && !blacklistSet.has(contributorLogin);
  });
};
