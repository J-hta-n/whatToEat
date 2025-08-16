import {
  TFoodPlaceByExploreArraysSchema,
  TFoodPlaceSchema,
} from "@/app/api/foodplaces/post.schema";
import {
  countFoodPlaces,
  createFoodPlaceWithRelationsTransaction,
  fetchFoodPlaces,
} from "./repo";
import {
  buildOrderByQuery,
  buildWhereQuery,
  getPage,
} from "@/lib/utils/searchParamUtils";

/**
 * Creates a new foodplace with its relations (cuisines, dishes, tags).
 */
export const createFoodPlaceService = async (
  body: TFoodPlaceByExploreArraysSchema,
  userId?: string
) => {
  const { cuisines, dishes, tags, ...foodPlaceData } = body;
  const foodPlace: TFoodPlaceSchema & { created_by?: string } = {
    ...foodPlaceData,
    created_by: userId,
  };

  return createFoodPlaceWithRelationsTransaction(foodPlace, {
    cuisines,
    dishes,
    tags,
  });
};

/**
 * Gets all foodplaces with pagination based on user ID and search params, which
 * includes filter and sort by fields.
 * @param searchParams
 * @param pageSize
 * @param userId
 * @returns
 */
export const getFoodPlacesService = async (
  searchParams: URLSearchParams,
  pageSize: number = 20,
  userId?: string
) => {
  const orderBy = buildOrderByQuery(searchParams);
  const where = {
    ...buildWhereQuery(searchParams),
    created_by: userId || null,
  };
  const curPage = getPage(searchParams);
  const skip = (curPage - 1) * pageSize;

  const [foodPlaces, count] = await Promise.all([
    // @ts-ignore: no need to check orderBy fields so strictly
    fetchFoodPlaces({ where, orderBy, skip, take: pageSize }),
    countFoodPlaces(where),
  ]);
  const totalPages = Math.ceil(count / pageSize);
  return {
    foodPlaces,
    totalPages,
    curPage,
  };
};
