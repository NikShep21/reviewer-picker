import type { GithubContributor } from "../types";

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const image = new Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });

export const preloadContributorsAvatars = async (contributors: GithubContributor[]) => {
  const uniqueAvatarUrls = Array.from(
    new Set(contributors.map((contributor) => contributor.avatar_url)),
  );

  await Promise.all(uniqueAvatarUrls.map((avatarUrl) => preloadImage(avatarUrl)));
};
