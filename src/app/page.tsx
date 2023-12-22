import database from "@/prisma";
import React from "react";

const HomePage = async () => {
  const foodPlaces = await database.foodPlace.findMany();

  return (
    <div>
      {foodPlaces.map((place) => (
        <p>{place.place_name}</p>
      ))}
    </div>
  );
};

export default HomePage;
