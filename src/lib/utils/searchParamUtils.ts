import { URLSearchParams } from "url";

/*
searchParams (obtained from props for SSR and useSearchParams() for CSR) is a list of 
string key-value searchParam pairs.

DupKeyPattern means ?tag=tag1&tag=tag2 while ConcatPattern means ?tag=tag1,tag2.
Here, all utils follow ConcatPattern.
*/

/**
 * Gets canonical searchParams to prevent duplicate useSWR keys, eg tag=tag1,tag2 is the
 * same as tag=tag2,tag1, but useSWR treats them as different keys leading to duplicate
 * requests.
 * A little guide on naming conventions: for data transformations, use the respective
 * transformation verb; only use 'get' if we are simply retrieving / parsing data from the
 * input or some other source.
 * @param params URLSearchParams object
 * @returns canonical searchParams string
 */
export function canonicaliseSearchParams(params: URLSearchParams): string {
  const paramMap = new Map<string, string>();

  for (const [key, val] of params.entries()) {
    let fields = val;
    // Sort values for all keys except sortBy
    if (key !== "sortBy") fields = fields.split(",").sort().join(",");
    paramMap.set(key, fields);
  }

  return Array.from(paramMap.entries())
    .sort(([a], [b]) => a.localeCompare(b)) // Sort keys
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
}

export function setNewSortQuery(searchParams: URLSearchParams, col: string) {
  // If sortBy is empty, just set col
  const sortByVal = searchParams.get("sortBy");
  if (!sortByVal) {
    searchParams.set("sortBy", col);
    return;
  }
  // If sortBy has fields, remove col if it alr exists, else add it
  const sortFields = sortByVal.split(",");
  let newSortQuery: string;
  if (sortFields.includes(col)) {
    // Edge case: remove sortBy if col is the only field
    if (sortFields.length === 1) {
      searchParams.delete("sortBy");
      return;
    }
    newSortQuery = sortFields.filter((val) => val !== col).join(",");
  } else {
    newSortQuery = `${sortByVal},${col}`;
  }
  searchParams.set("sortBy", newSortQuery);
}

export function isColSorted(searchParams: URLSearchParams, col: string) {
  const sortByVal = searchParams.get("sortBy");
  if (!sortByVal) return false;
  return sortByVal.split(",").includes(col);
}

export function getPage(searchParams: URLSearchParams) {
  const page = searchParams.get("page");
  if (!page) return 1;
  const pageNum = parseInt(page);
  return isNaN(pageNum) ? 1 : pageNum;
}

export function appendSearchParams(
  path: string,
  searchParams: URLSearchParams
) {
  return searchParams.toString() ? `${path}?${searchParams}` : path;
}

///////////// PRISMA QUERY BUILDER FUNCTIONS /////////////
export function buildOrderByQuery(searchParams: URLSearchParams) {
  const sortByVal = searchParams.get("sortBy");
  if (!sortByVal) return [{ id: "asc" }];
  return sortByVal.split(",").map((field) => ({ [field]: "asc" as const }));
}

export function buildWhereQuery(searchParams: URLSearchParams) {
  const where: Record<string, { in: string[] }> = {};
  for (const key of searchParams.keys()) {
    if (key === "sortBy" || key === "page") continue;

    const values = searchParams.get(key)?.split(",") || [];
    if (values.length > 0) {
      where[key] = { in: values };
    }
  }
  return where;
}
