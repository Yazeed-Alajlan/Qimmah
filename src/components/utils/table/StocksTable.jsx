import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Card } from "../cards/Card";
import InputSelect from "../inputs/InputSelect";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import SearchInput from "../inputs/SearchInput";
import { Button } from "../buttons/Button";
import Divider from "../Divider";
import Badge from "../Badge";
import Link from "next/link";

const StocksTable = ({
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

  const dataToMap = isScrollable ? rows : page;
  return (
    <Card className={className} header={header}>
      {tableData && (
        <>
          {(filterBy || searchBy) && (
            <div className=" flex justify-between items-center  gap-4">
              {searchBy && (
                <SearchInput
                  placeholder={`Search by ${formatKey(searchBy)}`}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              )}
              {filterBy && (
                <InputSelect
                  className={"w-2/3"}
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
              <Button
                variant="danger"
                text={"حذف"}
                onClick={() => {
                  setFilterOption("");
                  setSearchText("");
                }}
              />
            </div>
          )}
          <Divider />
          <div
            className={`overflow-x-auto ${
              isScrollable
                ? "max-w-full overflow-x-auto max-h-96 overflow-y-auto"
                : ""
            }`}
          >
            <table
              {...getTableProps()}
              className=" whitespace-nowrap  text-gray-600 dark:text-gray-400"
            >
              <thead className="sticky top-0 uppercase font-bold   text-gray-700  bg-white-200 dark:bg-gray-700 dark:text-gray-400">
                {headerGroups.map((headerGroup) => (
                  <tr
                    className=" border-b-2"
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="text-primary px-6 gap-2 cursor-pointer"
                        style={{
                          minWidth: column.minWidth,
                          width: column.width,
                        }}
                      >
                        <span className="flex items-center gap-1">
                          {column.render("Header")}

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
                      {...row.getRowProps()}
                      className="border-b-2 hover:bg-slate-50 text-sm "
                    >
                      {row.cells.map((cell, index) => {
                        const columnsToCheck = [5, 6]; // Define columns to check for color change

                        const isColored = columnsToCheck.includes(index); // Check if this column needs coloring
                        const [symbol, name] = cell.value.split(" - ");
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
                            {index === 0 ? (
                              <Link
                                href={`/companies/${row.original.sectorNameAr}/${symbol}/information`}
                                className=""
                                // to={`/companies/${row.original.sectorNameAr}/${symbol}/information`}
                                // onClick={() => {
                                //   setSelectedStock({
                                //     value: symbol,
                                //     label: `${name} (${symbol})`,
                                //     sector: row.original.sectorNameAr,
                                //   });
                                // }}
                              >
                                <span>
                                  <Badge
                                    className="fw-bold me-2"
                                    variant="primary" // Use variant instead of color
                                    text={symbol}
                                  />
                                </span>

                                <span>{name}</span>
                              </Link>
                            ) : (
                              cell.render("Cell")
                            )}
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