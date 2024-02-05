import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import InputSelect from "../inputs/InputSelect";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { Card } from "../cards/Card";
import SearchInput from "../inputs/SearchInput";
import Button from "../buttons/Button";
import Divider from "../Divider";
import Link from "next/link";
import Badge from "../Badge";

const Table = ({
  header,
  tableData,
  tableColumns,
  searchBy,
  filterBy,
  removeFilterFromColumn,
  isScrollable,
  className,
}) => {
  const columns = useMemo(() => {
    if (!tableData || tableData.length === 0) {
      return [];
    }
    const keys = Object.keys(tableData[0]);

    const filteredKeys = keys.filter((key) =>
      removeFilterFromColumn ? key !== filterBy && key !== "_id" : true
    );

    const generatedColumns = filteredKeys.map((key) => ({
      Header: formatKey(key),
      accessor: key,
    }));

    return generatedColumns;
  }, [tableData, tableColumns]);

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const filteredData = useMemo(() => {
    let data = tableData;
    if (searchText) {
      data = data.filter(
        (row) =>
          row[`${searchBy}`] &&
          row[`${searchBy}`].toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (filterOption) {
      data = data.filter(
        (row) =>
          row[`${filterBy}`] &&
          row[`${filterBy}`].toLowerCase() === filterOption.toLowerCase()
      );
    }
    return data;
  }, [tableData, searchText, filterOption]);

  const uniqueFilter = useMemo(() => {
    const filters = [...new Set(tableData.map((row) => row[`${filterBy}`]))];
    return filters.filter((filter) => filter);
  }, [tableData]);

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
      columns: tableColumns ? tableColumns : columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 15 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      {tableData && (
        <>
          {(filterBy || searchBy) && (
            <>
              <div className=" grid grid-cols-6 gap-4 ">
                {filterBy && (
                  <div className="col-span-2">
                    <InputSelect
                      placeholder="تصفية حسب القطاع"
                      value={filterOption}
                      options={[
                        ...uniqueFilter.map((sector, index) => ({
                          value: sector,
                          label: sector,
                        })),
                      ]}
                      onChange={(e) => {
                        setFilterOption(e && e.value);
                      }}
                      isSearchable={true}
                      labelDirection="hr"
                    />
                  </div>
                )}
                {searchBy && (
                  <div className="col-span-3 mb-6 w-1/2">
                    <SearchInput
                      placeholder={`Search by ${formatKey(searchBy)}`}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                )}
                {/* <div className="col-span-1 mx-auto ">
                  <Button
                    variant="danger"
                    text={"حذف"}
                    onClick={() => {
                      setFilterOption("");
                      setSearchText("");
                    }}
                  />
                </div> */}
              </div>
            </>
          )}
          <div
            className={`overflow-x-auto ${
              isScrollable
                ? "max-w-full overflow-x-auto max-h-96 overflow-y-auto"
                : ""
            }`}
          >
            <table
              {...getTableProps()}
              className=" whitespace-nowrap w-full  text-gray-600 dark:text-gray-400"
            >
              <thead className="sticky top-0 uppercase font-bold   text-gray-700   dark:text-gray-400">
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
                        <span className="flex gap-2">
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
                        </span>{" "}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="" {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={row.id} // Add key here
                      {...row.getRowProps()}
                      className="border-b-2 hover:bg-gray-200 text-sm "
                    >
                      {row.cells.map((cell, index) => {
                        const columnsToCheck = []; // Define columns to check for color change
                        const isColored = columnsToCheck.includes(index); // Check if this column needs coloring
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={index}
                            className={
                              isColored
                                ? cell.value.includes("-")
                                  ? "text-danger px-6 py-3"
                                  : "text-success px-6 py-3"
                                : "text-black px-6 py-3" // Black color for columns not in columnsToCheck
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
            <div className="flex justify-center items-center mt-2">
              <Button
                className="bg-primary mx-2"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                text="Previous"
              />
              <span className="">
                Page
                <strong>
                  {pageIndex + 1} of {Math.ceil(filteredData.length / 15)}
                </strong>
              </span>
              <Button
                className="bg-primary mx-2"
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

const formatKey = (key) => {
  const formattedKey = key.replace(/_/g, " ");
  const titleCaseKey = formattedKey
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return titleCaseKey;
};

export default Table;
