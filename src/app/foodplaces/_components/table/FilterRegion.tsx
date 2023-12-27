"use client";

import { useRouter } from "next/navigation";
// CREDITS: REACT-SELECT

import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FoodQuery } from "../../page";
import { Region } from "@prisma/client";
import { enumMappings } from "@/../prisma/enumMappings";

const animatedComponents = makeAnimated();

interface Props {
  searchParams: FoodQuery;
}

export default function FilterRegion({ searchParams }: Props) {
  let options: { value: Region; label: string }[] = new Array();
  const placeType = Object.entries(enumMappings["region"]).forEach(
    ([val, label]: [Region, string]) => {
      options.push({ value: val, label: label });
    }
  );

  const router = useRouter();
  return (
    <Select
      onChange={(event) => {
        const placeTypes: Region[] = event.map((obj) => obj.value);
        const params = new URLSearchParams(searchParams);
        if (placeTypes.length === 0) {
          params.delete("region");
        } else {
          params.set("region", placeTypes.join(","));
        }
        router.push(
          params.toString() ? `/foodplaces?${params.toString()}` : "/foodplaces"
        );
      }}
      placeholder="Filter by region"
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
    />
  );
}
