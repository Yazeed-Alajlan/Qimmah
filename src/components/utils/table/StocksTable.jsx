import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Card } from "../cards/Card";
import InputSelect from "../inputs/InputSelect";

const StocksTable = ({
  header,
  tableData,
  tableColumns,
  searchBy,
  filterBy,
  removeFilterFromColumn,
  isScrollable,
}) => {
  console.log(tableData);
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

  const dataToMap = isScrollable ? rows : page;
  return (
    <Card header={header}>
      {tableData && (
        <>
          {(filterBy || searchBy) && (
            <form className="mb-4">
              {searchBy && (
                <input
                  type="text"
                  placeholder={`Search by ${formatKey(searchBy)}`}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="border px-4 py-2"
                />
              )}
              {filterBy && (
                <InputSelect
                  label={"Sector"}
                  className={"w-1/2"}
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
              )}
            </form>
          )}
          <div class="pb-4 bg-white dark:bg-gray-900">
            <label for="table-search" class="sr-only">
              Search
            </label>
            <div class="relative mt-1">
              <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
          <div
            className={`${
              isScrollable
                ? "max-w-full overflow-x-auto max-h-96 overflow-y-auto"
                : ""
            }`}
          >
            <table
              {...getTableProps()}
              className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead className="sticky top-0  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {headerGroups.map((headerGroup) => (
                  <tr
                    className="p-10 border-b-2"
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="text-primary text-start px-4 cursor-pointer"
                        style={{
                          minWidth: column.minWidth,
                          width: column.width,
                        }}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "🔽"
                              : "🔼"
                            : ""}
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
                      {...row.getRowProps()}
                      className="border-b-2 hover:bg-slate-50"
                    >
                      {row.cells.map((cell, index) => (
                        <td
                          className="px-4 "
                          {...cell.getCellProps()}
                          key={index}
                        >
                          {index === 0
                            ? cell.render("Cell")
                            : cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {!isScrollable && (
            <div className="flex justify-center items-center mt-2">
              <button
                className="btn-primary mx-2"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <button
                className="btn-primary"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
              <span className="ml-2">
                Page
                <strong>
                  {pageIndex + 1} of {Math.ceil(filteredData.length / 15)}
                </strong>
              </span>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

const formatKey = (key) => {
  const formattedKey = key.replace(/_/g, " ");
  const titleCaseKey = formattedKey
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return titleCaseKey;
};

export default StocksTable;
