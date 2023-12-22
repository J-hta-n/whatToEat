import database from "@/prisma";
import React from "react";

const HomePage = async () => {
  const foodPlaces = await database.foodPlace.findMany();

  return <div>HomePage</div>;
};

export default HomePage;
