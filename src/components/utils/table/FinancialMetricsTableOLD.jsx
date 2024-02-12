import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Card } from "../cards/Card";
import InputSelect from "../inputs/InputSelect";

const FinancialMetricsTable = ({
  header,
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
      initialState: { pageIndex: 0 },
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

          <div
            className={`${
              isScrollable
                ? "max-w-full overflow-x-auto max-h-96 overflow-y-auto"
                : ""
            }`}
          >
            <table {...getTableProps()} className="">
              <thead className="sticky top-0 bg-gray-100">
                {headerGroups.map((headerGroup, index) => (
                  <tr
                    key={index} // Add key here
                    className="p-10 border-b-2"
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id} // Add key here
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
                      key={row.id} // Add key here
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
                  {pageIndex + 1} of {Math.ceil(filteredData.length / 10)}
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

export default FinancialMetricsTable;
