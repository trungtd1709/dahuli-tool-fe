import React from "react";
import { AppTable } from "../../../../components/AppTable";

export const ShippingTableNote = () => {
  const headers = [
    "Product Name",
    "Weight",
    "CNY",
    "USD",
    "Total CNY",
    "Total USD",
  ];

  const data = [["Sample Product", 10, 10, 50, 500, 75]];

  return (
    <>
      <span>File shipping note</span>
      <AppTable headers={headers} data={data} />
    </>
  );
};
