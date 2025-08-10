"use client";

import FoodTable from "./_components/table/FoodTable";
import FilterPanel from "./_components/filter-panel/FilterPanel";
import { Heading, Text } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

const FoodPlacesPage = () => {
  // TODO: Find out why toast isn't showing
  return (
    <>
      <div className="text-center mb-3">
        <Toaster />
        <Heading mb="1">Food Places Database</Heading>
        <Text size="2" color="grass">
          Feel free to create, modify, and delete the list of food places here.
          Places can be tagged to according to various categories in the
          {" 'Explore'"} page.
          <br />
        </Text>
      </div>
      <FilterPanel />
      <FoodTable />
    </>
  );
};

export default FoodPlacesPage;
