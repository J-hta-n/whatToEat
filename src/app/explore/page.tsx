import { Card, Flex, Heading, Inset, Strong, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const options = [
  {
    title: "By cuisines",
    description:
      "Explore different types of food according to their unique style and roots.",
    img: "https://facts.net/wp-content/uploads/2022/07/food-world-map-730x487.jpeg",
    href: "/explore/cuisines",
  },
  {
    title: "By dishes",
    description:
      "Want a particular dish? Find all relevant food places which serve just that.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRwKCHHQ1T9x2lRr5exjtIKJJkwt2Xlw0XP5bhwTDJg&s",
    href: "/explore/dishes",
  },
  {
    title: "By custom tags",
    description:
      "Find the most suitable food place based on your individual preferences.",
    img: "https://img.freepik.com/free-vector/gear-doodle-setting-icon-hand-drawn-cartoon-art-illustration_56104-883.jpg",
    href: "/explore/tags",
  },
  {
    title: "By locations",
    description:
      "Find the most convenient food located at the right place at the right time.",
    img: "https://thumbs.dreamstime.com/b/city-map-location-marker-high-angle-view-red-126304585.jpg",
    href: "/explore/locations",
  },
];

// Styling credits to https://www.radix-ui.com/themes/docs/components/card
const ExplorePage = () => {
  return (
    <div>
      <div className="text-center mb-10">
        <Heading mb="1">Browse</Heading>
        <Text size="2" color="grass">
          Explore different food places by useful categories and custom tags, or
          by directly filtering them in the food places database.
        </Text>
      </div>

      <Flex
        gap="7"
        wrap="wrap"
        className="mt-3"
        align="center"
        justify="center"
      >
        {options.map((option, i) => {
          return (
            <Link key={i} href={option.href}>
              <Card className="w-72">
                <Inset>
                  <img
                    src={option.img}
                    alt="cover img"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: 180,
                      backgroundColor: "lightgrey",
                      borderBottom: "0.2px solid lightgrey",
                      marginBottom: 20,
                    }}
                  />
                </Inset>
                <Strong>{option.title}</Strong>
                <Text as="p">{option.description}</Text>
              </Card>
            </Link>
          );
        })}
      </Flex>
    </div>
  );
};

export default ExplorePage;
