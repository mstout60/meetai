import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import { DEFAULT_PAGE } from "@/constants";

import { MeetingStatus } from "./types";

export const filtersSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum(Object.values(MeetingStatus)),
  agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

const baseLoadSearchParams = createLoader(filtersSearchParams);

export const loadSearchParams = async (
  searchParams: Parameters<typeof baseLoadSearchParams>[0],
) => {
  const parsed = await baseLoadSearchParams(searchParams);
  return {
    ...parsed,
    page: Math.max(DEFAULT_PAGE, parsed.page),
  };
};
