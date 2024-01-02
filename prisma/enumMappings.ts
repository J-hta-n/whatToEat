import { FoodPlace, PlaceType, Region } from "@prisma/client";

// export enum PlaceType {
//   RESTAURANT = "Restaurant",
//   HAWKER_STALL = "Hawker stall",
//   CANTEEN_STALL = "Canteen stall",
//   BAKERY = "Bakery",
//   DESSERT_PLACE = "Dessert place",
// }

// export enum Region {
//   NORTH = "North",
//   EAST = "East",
//   CENTRAL = "Central",
//   WEST = "West",
//   ISLANDWIDE = "Islandwide",
// }

type EnumMapping = Record<PlaceType, string> | Record<Region, string>;

export const enumMappings: Record<keyof FoodPlace, EnumMapping> = {
  place_type: {
    RESTAURANT: "Restaurant",
    HAWKER_STALL: "Hawker stall",
    CANTEEN_STALL: "Canteen stall",
    BAKERY: "Bakery",
    DESSERT_PLACE: "Dessert place",
  },
  region: {
    NORTH: "North",
    EAST: "East",
    CENTRAL: "Central",
    WEST: "West",
    ISLANDWIDE: "Islandwide",
  },
} as Record<keyof FoodPlace, EnumMapping>;
