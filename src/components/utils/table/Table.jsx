import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import InputSelect from "../inputs/InputSelect";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import SearchInput from "../inputs/SearchInput";
import Button from "../buttons/Button";
import Divider from "../Divider";

const Table = ({
  tableData,
  tableColumns,
  searchBy,
  filterBy,
  removeFilterFromColumn,
  isScrollable,
  divider = true,
  className,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );
  const dataToMap = isScrollable ? rows : page;

  return (
    <>
      {tableData && (
        <>
          <div
            className={`overflow-auto w-full  ${
              isScrollable ? " max-h-96 " : ""
            }`}
          >
            <table
              {...getTableProps()}
              className=" whitespace-nowrap w-full overflow-x-auto  text-gray-600 dark:text-gray-400"
            >
              <thead className="sticky top-0 bg-white uppercase font-bold   text-gray-700   dark:text-gray-400">
                {headerGroups.map((headerGroup, index) => (
                  <tr
                    key={index} // Add key here
                    className="border-b-4"
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id} // Add key here
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="text-primary px-6 gap-2 cursor-pointer"
                        style={{
                          minWidth: column.minWidth,
                          width: column.width,
                        }}
                      >
                        <span className="flex items-center gap-2">
                          {column.render("Header")}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <TbSortDescending />
                              ) : (
                                <TbSortAscending />
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {dataToMap.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={row.id}
                      {...row.getRowProps()}
                      className="border-b-2 hover:bg-gray-200 text-sm "
                    >
                      {row.cells.map((cell, index) => {
                        const columnsToCheck = [];
                        const isColored = columnsToCheck.includes(index);
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={index}
                            className={
                              isColored
                                ? cell.value.includes("-")
                                  ? "text-danger px-6 py-3"
                                  : "text-success px-6 py-3"
                                : "text-black px-6 py-3"
                            }
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {!isScrollable && (
            <div className="flex justify-center items-center mt-2 gap-4">
              <Button
                variant={"primary"}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                text="Previous"
              />
              <span>
                Page
                <strong>
                  {pageIndex + 1} of {Math.ceil(tableData.length / 10)}
                </strong>
              </span>
              <Button
                variant={"primary"}
                onClick={() => nextPage()}
                disabled={!canNextPage}
                text="Next"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Table;
