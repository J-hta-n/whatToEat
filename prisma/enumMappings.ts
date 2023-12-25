import { FoodPlace } from "@prisma/client";

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

export const enumMappings: Record<keyof FoodPlace, any> = {
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
};
