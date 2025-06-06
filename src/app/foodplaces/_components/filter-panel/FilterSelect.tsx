"use client";

// CREDITS: REACT-SELECT

import { useRouter } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import makeAnimated from "react-select/animated";
import { FoodQuery } from "../../page";
import { FoodPlace, PlaceType, Region } from "@prisma/client";
import { enumMappings } from "@/../prisma/enumMappings";

// Dynamically load React-Select to avoid SSR mismatch
const Select = dynamic(() => import("react-select"), { ssr: false });
const animatedComponents = makeAnimated();

type EnumTypes = Region | PlaceType;

interface Props {
  searchParams: FoodQuery;
  enumKey: keyof FoodPlace;
}

export default function FilterSelect<T extends EnumTypes>({
  searchParams,
  enumKey,
}: Props) {
  let options: { value: T; label: string }[] = new Array();
  // Populate all the enum options for the Select component
  // @ts-ignore
  Object.entries(enumMappings[enumKey]).forEach(([val, label]: [T, string]) => {
    options.push({ value: val, label: label });
  });

  const router = useRouter();

  return (
    <Select
      instanceId="static-id"
      onChange={(event) => {
        // @ts-ignore
        const selectedOptions: T[] = event.map((obj) => obj.value);
        const params = new URLSearchParams(searchParams);
        if (selectedOptions.length === 0) {
          params.delete(enumKey); // Delete search param if empty, else add all options
        } else {
          params.set(enumKey, selectedOptions.join(","));
        }
        // Rmb to remove page filter too
        params.delete("page");
        router.push(
          // Remove all search params if empty
          params.toString()
            ? `/foodplaces?${params.toString()}`
            : "/foodplaces",
          { scroll: false }
        );
      }}
      placeholder={`Filter by ${enumKey.replace(/_/g, " ")}`}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
    />
  );
}
