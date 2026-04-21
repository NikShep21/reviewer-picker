interface ParsedGithubRepository {
  owner: string;
  repository: string;
}

export const parseGithubRepository = (value: string): ParsedGithubRepository | null => {
  const parts = value
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length !== 2) {
    return null;
  }

  const [owner, repository] = parts;

  if (!owner || !repository) {
    return null;
  }

  return { owner, repository };
};
