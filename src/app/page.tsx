import { Button, Flex, Heading, Strong, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const HomePage = async () => {
  // HomePage template credits to https://www.tailwindawesome.com/resources/vpn-landing-page
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
      <div className="flex flex-col justify-center order-2 sm:order-1">
        <h1
          className="
            text-3xl
            lg:text-4xl
            xl:text-5xl 
            font-medium 
            text-black-600
            leading-normal
            text-center
            transition-all duration-300 ease-in-out
          "
        >
          Unsure of what to eat? <br />
          <strong>Fret not.</strong>
        </h1>
        <p className="text-black-500 mt-4 mb-6 text-justify">
          WhatToEat lets you create and organise your favourite food places in a
          single database, and allows you to quickly find the most suitable food
          places by filtering based on various conditions and preferences.
        </p>
        <div className="flex flex-col items-center">
          <Flex gap="7" align="center">
            <Link href="/foodplaces">
              <Button size="4" className="hover:cursor-pointer min-w-32">
                <p className="text-xs md:text-lg text-center">
                  {"Let's get started!"}
                </p>
              </Button>
            </Link>
            <p>or</p>
            <Link href="/explore">
              <Button size="4" color="plum" className="hover:cursor-pointer">
                <p className="text-xs md:text-lg min-w-30 text-center">
                  Explore {">>"}
                </p>
              </Button>
            </Link>
          </Flex>
        </div>
      </div>
      <div className="flex w-full order-1 sm:order-2 items-center">
        <div className="h-full w-full">
          <img
            // src="https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg"
            src="https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg"
            alt="cover img"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
