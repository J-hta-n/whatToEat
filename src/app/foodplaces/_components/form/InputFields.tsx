import { TFoodPlaceByExploreArraysSchema } from "@/validationSchemas";

import { Checkbox, Rating, TextField } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { enumMappings } from "@/../prisma/enumMappings";
import { Flex } from "@radix-ui/themes";
import { Cuisine, Dish, Tag } from "@prisma/client";
import Select from "react-select";

// https://www.react-hook-form.com/get-started/#IntegratingwithUIlibraries

export const inputFields: {
  key: keyof TFoodPlaceByExploreArraysSchema;
  component: (
    register: UseFormRegister<TFoodPlaceByExploreArraysSchema>,
    control?: Control<TFoodPlaceByExploreArraysSchema>
  ) => ReactNode;
}[] = [
  {
    key: "place_name",
    component: (register) => (
      <Flex dir="col">
        <input
          type="text"
          {...register("place_name")}
          placeholder={"Place name"}
          className="p-1 flex-grow px-3 py-2 border-2 border-gray-300 rounded"
        />
        <span className="text-red-500 text-lg">*</span>
      </Flex>
    ),
  },
  {
    key: "place_type",
    component: (register) => (
      <Flex dir="col" className="mt-5">
        <select
          {...register("place_type")}
          className="p-2 flex-grow border-2 border-gray-300 rounded"
        >
          <option disabled>Place Type</option>
          {Object.entries(enumMappings["place_type"]).map(([key, value], i) => (
            <option key={i} value={key}>
              {value}
            </option>
          ))}
        </select>
        <span className="text-red-500 text-lg">*</span>
      </Flex>
    ),
  },
  {
    key: "tried_before",
    component: (register) => (
      <div className="p-1">
        Tried before: <Checkbox {...register("tried_before")} />
      </div>
    ),
  },
  {
    key: "lb_cost",
    component: (register) => (
      <Flex dir="col">
        <input
          type="number"
          {...register("lb_cost")}
          placeholder={" Min cost"}
          className="p-1 flex-grow px-3 py-2 border-2 border-gray-300 rounded w-2/5"
        />
        <div className="flex-grow" />
        <input
          type="number"
          {...register("ub_cost")}
          placeholder={" Max cost"}
          className="p-1 flex-grow px-3 py-2 border-2 border-gray-300 rounded w-2/5"
        />
        <span className="invisible">*</span>
      </Flex>
    ),
  },
  {
    key: "personal_rating",
    component: (_register, control) => (
      <Controller
        name="personal_rating"
        control={control}
        render={({ field }) => (
          <div className="p-1 mt-2" style={{ alignItems: "center" }}>
            <Flex dir="col">
              <span className="mr-2 w-2/5">Personal rating:</span>
              <Rating
                value={(field.value || 0) / 2} // Divide by 2 to display the correct range
                onChange={
                  (_event, newValue) =>
                    field.onChange(newValue ? newValue * 2 : 0) // Multiply by 2 for storage
                }
                precision={0.5}
              />
            </Flex>
          </div>
        )}
      />
    ),
  },
  {
    key: "google_rating",
    component: (_register, control) => (
      <Controller
        name="google_rating"
        control={control}
        render={({ field }) => (
          <div className="p-1 pt-0" style={{ alignItems: "center" }}>
            <Flex dir="col">
              <span className="mr-2 w-2/5">Google rating:</span>
              <Rating
                value={(field.value || 0) / 2} // Divide by 2 to display the correct range
                onChange={
                  (_event, newValue) =>
                    field.onChange(newValue ? newValue * 2 : 0) // Multiply by 2 for storage
                }
                precision={0.5}
              />
            </Flex>
          </div>
        )}
      />
    ),
  },
  {
    key: "region",
    component: (register) => (
      <Flex dir="col" className="mt-2">
        <select
          {...register("region")}
          className="p-2 flex-grow border-2 border-gray-300 rounded"
        >
          <option disabled>Region</option>
          {Object.entries(enumMappings["region"]).map(([key, value], i) => (
            <option key={i} value={key}>
              {value}
            </option>
          ))}
        </select>
        <span className="text-red-500 text-lg">*</span>
      </Flex>
    ),
  },
];

export const exploreArrayFields: {
  key: keyof TFoodPlaceByExploreArraysSchema;
  component: (
    explorePageContext: {
      cuisines: Cuisine[];
      dishes: Dish[];
      tags: Tag[];
    },
    control: Control<TFoodPlaceByExploreArraysSchema>
    // register: UseFormRegister<TFoodPlaceByExploreArraysSchema>
  ) => ReactNode;
}[] = [
  {
    key: "cuisines",
    component: (explorePageContext, control) => (
      <Controller
        name="cuisines" // Register cuisines
        control={control}
        render={({ field }) => {
          const options = explorePageContext["cuisines"].map((cuisine) => ({
            value: cuisine.id,
            label: cuisine.cuisine,
          }));
          return (
            <Flex dir="col" className="mt-2">
              <div className="flex-grow">
                <Select
                  placeholder="Cuisines"
                  {...field}
                  // @ts-ignore
                  options={options}
                  className="mt-5"
                  isMulti
                  closeMenuOnSelect={false}
                />
              </div>
              <span className="invisible">*</span>
            </Flex>
          );
        }}
      />
    ),
  },
];

// <Flex dir="col" className="mt-2">
//   <select
//     {...control("cuisines")}
//     multiple
//     className="p-2 flex-grow border-2 border-gray-300 rounded"
//   >
//     <option disabled>Cuisines</option>
//     {explorePageContext["cuisines"].map((cuisine: Cuisine, i) => (
//       <option key={i} value={cuisine["id"]}>
//         {cuisine["cuisine"]}
//       </option>
//     ))}
//   </select>
//   <span className="text-red-500 text-lg">*</span>
// </Flex>
// To use React Select
// <Controller
//   name="place_type"
//   control={control}
//   render={({ field }) => {
//     const options = Object.entries(enumMappings["place_type"]).map(
//       ([key, value]) => ({
//         value: key,
//         label: value,
//       })
//     );
//     return (
//       <Select
//         placeholder="Place Type"
//         {...field}
//         // @ts-ignore
//         options={options}
//         value={options.find((option) => option.value == field.value)} // Map string to object
//         onChange={(selectedOption) =>
//           field.onChange(selectedOption ? selectedOption.value : "")
//         } // Map object to string
//         className="mt-5"
//       />
//     );
//   }}
// />
