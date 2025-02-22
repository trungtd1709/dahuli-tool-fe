import React from "react";
import { AppTable } from "../../../../components/AppTable";

export const OrderTableNote = () => {
  const headers = [
    "Product Name",
    "Picture",
    "Qty (Pcs)",
    "CNY",
    "Total CNY",
    "Total USD",
  ];

  const data = [
    ["Sample Product", "https://via.placeholder.com/50", 10, 50, 500, 75],
  ];

  return (
    <>
      <span>File order note</span>
      <AppTable headers={headers} data={data} />
    </>
  );
};
