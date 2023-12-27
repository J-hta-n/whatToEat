"use client";

import { useRouter } from "next/navigation";
// CREDITS: REACT-SELECT

import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FoodQuery } from "../../page";
import { PlaceType } from "@prisma/client";
import { enumMappings } from "@/../prisma/enumMappings";

const animatedComponents = makeAnimated();

interface Props {
  searchParams: FoodQuery;
}

export default function FilterPlaceType({ searchParams }: Props) {
  let options: { value: PlaceType; label: string }[] = new Array();
  const placeType = Object.entries(enumMappings["place_type"]).forEach(
    ([val, label]: [PlaceType, string]) => {
      options.push({ value: val, label: label });
    }
  );

  const router = useRouter();
  return (
    <Select
      onChange={(event) => {
        const placeTypes: PlaceType[] = event.map((obj) => obj.value);
        const params = new URLSearchParams(searchParams);
        if (placeTypes.length === 0) {
          params.delete("place_type");
        } else {
          params.set("place_type", placeTypes.join(","));
        }
        router.push(
          params.toString() ? `/foodplaces?${params.toString()}` : "/foodplaces"
        );
      }}
      placeholder="Filter by place type"
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
    />
  );
}
