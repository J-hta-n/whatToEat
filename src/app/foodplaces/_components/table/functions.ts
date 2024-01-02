import { URLSearchParams } from "url";
import { FoodQuery } from "../../page";
import { FoodPlace, PlaceType } from "@prisma/client";

///////////// DUP KEY METHOD FUNCTIONS /////////////
export function dupKeyMethod(searchParams: FoodQuery) {
  let queryString = "?";
  Object.entries(searchParams).forEach(([key, value]) => {
    let vals: string[];
    vals = Array.isArray(value) ? value : [value];
    queryString += vals
      .map((str) => `${key}=${encodeURIComponent(str)}`)
      .join("&");
  });
  return new URLSearchParams(queryString);
}

// should return sth like this:     {
//   place_type: { in: [PlaceType.BAKERY, PlaceType.RESTAURANT] },
// },
export function buildWhereQuery(searchParams: FoodQuery) {
  return Object.fromEntries(
    Object.entries(searchParams)
      .filter(([key]) => key !== "sortBy" && key !== "page")
      .map(([key, value]) => [key, { in: value }])
  );
}

///////////// CONCAT METHOD FUNCTIONS /////////////
/**
 * Modifies searchParams in-place by splitting the string into indiv values.
 * (searchParams: FoodQuery) => void
 * @param searchParams
 */
export function concatMethod(searchParams: FoodQuery) {
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) return;
    searchParams[key] = value.split(",");
  });
}

export function setNewSortQuery(params: URLSearchParams, colVal: string) {
  // if sortBy is empty, just set colVal
  const sortVal = params.get("sortBy");
  if (sortVal === null) {
    params.set("sortBy", colVal);
    return;
  }
  // if sortBy has vals, remove colVal if it alr exists, else add it
  const colVals = sortVal.split(",");
  let newSortQuery: string;
  if (colVals.includes(colVal)) {
    // Edge case: remove the only colVal
    if (colVals.length === 1) {
      params.delete("sortBy");
      return;
    }
    newSortQuery = colVals.filter((val) => val !== colVal).join(",");
  } else {
    newSortQuery = `${sortVal},${colVal}`;
  }
  params.set("sortBy", newSortQuery);
}

export function isColSorted(params: URLSearchParams, colVal: string) {
  const sortVal = params.get("sortBy");
  if (sortVal === null) return false;
  return sortVal.split(",").includes(colVal);
}

export function getOrderBy(searchParams: FoodQuery) {
  const colVals = searchParams.sortBy;
  let orderBy: Record<keyof FoodPlace, "asc" | "desc">[];
  if (!colVals) {
    return [{ id: "asc" }];
  }
  if (!Array.isArray(colVals)) {
    return [{ [colVals]: "asc" }];
  }
  orderBy = colVals.map((colVal) => ({
    [colVal]: "asc",
  }));

  return orderBy;
}
