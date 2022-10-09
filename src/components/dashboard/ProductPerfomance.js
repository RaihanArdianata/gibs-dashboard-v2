import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import { useTable } from 'react-table';

const ProductPerfomance = ({ tableTitle, header = [], tableData = [] }) => {
  const columns = React.useMemo(
    () => header,
    [header]
  );
  const data = React.useMemo(
    () => tableData,
    [tableData]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <BaseCard header={tableTitle}>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
        {...getTableProps()}
      >
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell key={index} {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* <Typography color="textSecondary" variant="h6">
                    {item.name}
                  </Typography> */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <TableRow key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <TableCell  {...cell.getCellProps()} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* <Typography
                            color="textSecondary"
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {cell.render('Cell')}
                          </Typography> */}
                        {cell.render('Cell')}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default ProductPerfomance;
