import { baseApi } from "@/shared/api/baseApi";
import type { GetContributorsArgs, GithubContributor } from "../model/types";

export const getContributors = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContributors: builder.query<GithubContributor[], GetContributorsArgs>({
      query: ({ owner, repository }) => ({
        url: `/repos/${owner}/${repository}/contributors`,
        params: {
          per_page: 100,
        },
      }),
    }),
  }),
});

export const { useLazyGetContributorsQuery, useGetContributorsQuery } = getContributors;
