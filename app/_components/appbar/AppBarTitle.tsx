"use client";

import { useContext } from "react";

import UiContext from "@/context/UiContext";

export default function AppBarTitle() {
  const { pageTitle } = useContext(UiContext);

  return <h1 className="font-medium text-2xl text-white">{pageTitle}</h1>;
}
