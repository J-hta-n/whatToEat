"use client";

import React from "react";
import { ColorRing } from "react-loader-spinner";

export default function SpinnerLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
}
