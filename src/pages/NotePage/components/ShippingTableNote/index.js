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
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <span>File shipping note</span>
      <span>Shipping mặc định là international. Nếu là domestic thì thêm chữ domestic trong tên</span>
      <span>VD: Domestic Shipping from eBay to Bestone - S304</span>
      <AppTable headers={headers} data={data} />
    </div>
  );
};
