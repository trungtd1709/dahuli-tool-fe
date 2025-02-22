import React from "react";
import { Table } from "antd";

export const AppTable = ({ headers, data }) => {
  // Convert headers array into Ant Design table columns
  const columns = headers.map((header, index) => ({
    title: header,
    dataIndex: `col${index}`, // Generate unique data keys dynamically
    key: `col${index}`,
  }));

  // Convert data into the expected Ant Design format
  const formattedData = data.map((row, rowIndex) => {
    const rowData = { key: rowIndex };
    row.forEach((value, colIndex) => {
      rowData[`col${colIndex}`] = value;
    });
    return rowData;
  });

  return <Table columns={columns} dataSource={formattedData} pagination={false} bordered />;
};
