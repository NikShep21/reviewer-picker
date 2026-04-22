export interface GithubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
}
export type GetContributorsArgs = {
  owner: string;
  repository: string;
};
