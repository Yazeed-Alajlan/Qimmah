"use client";

import Divider from "@/components/utils/Divider";
import InputSelect from "@/components/utils/inputs/InputSelect";
import React, { useMemo, useState } from "react";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { useTable, useSortBy, usePagination } from "react-table";

const FinancialMetricsComparisonTable = ({
  tableData,
  tableColumns,
  searchBy,
  filterBy,
  removeFilterFromColumn,
  isScrollable,
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
  }, [tableData]);

  const [selectedColumns, setSelectedColumns] = useState(tableColumns || []);

  const handleColumnChange = (selected) => {
    setSelectedColumns(selected);
  };

  const generateColumnOptions = () => {
    return columns.map((column) => ({
      value: column.accessor,
      label: column.Header,
    }));
  };

  const visibleColumns = useMemo(
    () => columns.filter((column) => selectedColumns.includes(column.accessor)),
    [columns, selectedColumns]
  );

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
      columns: visibleColumns, // Use visibleColumns instead of tableColumns
      data: filteredData,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const dataToMap = isScrollable ? rows : page;

  return (
    <>
      {(filterBy || searchBy) && (
        <>
          <div className=" grid grid-cols-4 justify-center items-center content-center gap-4 ">
            <div className="col-span-2">
              <InputSelect
                placeholder="إختر الأعمدة"
                value={selectedColumns}
                options={generateColumnOptions()}
                isMulti
                onChange={(selected) =>
                  handleColumnChange(selected.map((item) => item.value))
                }
                isSearchable={true}
              />
            </div>
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
          </div>
          <Divider />
        </>
      )}
      {tableData && (
        <>
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
            <div className="d-flex justify-content-center align-items-center mt-2">
              <button
                className="btn btn-primary mx-2"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
              <span className="ml-2">
                Page
                <strong>
                  {pageIndex + 1} of {Math.ceil(filteredData.length / 10)}
                </strong>
              </span>
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

export default FinancialMetricsComparisonTable;
