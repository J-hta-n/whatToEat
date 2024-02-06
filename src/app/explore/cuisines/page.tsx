import React from "react";
import SubPage from "../_components/SubPage";

const CuisinesPage = () => {
  // TODO: Fetch all cuisines directly from database; dunnid to unnecessarily abstract api
  // TODO: Display all cuisines here in a nice card list, abstract that component out for reuse
  // for locations and tags too
  return <SubPage backHref="/explore">Cuisines page</SubPage>;
};

export default CuisinesPage;
