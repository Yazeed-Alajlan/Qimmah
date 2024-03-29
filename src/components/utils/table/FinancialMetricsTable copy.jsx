import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import InputSelect from "../inputs/InputSelect";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import SearchInput from "../inputs/SearchInput";
import Button from "../buttons/Button";
import Divider from "../Divider";
import Badge from "../Badge";
import Link from "next/link";
import Skeleton from "@/components/Skeleton";

const FinancialMetricsTable = ({
  tableData,
  tableColumns,
  searchBy,
  filterBy,
  removeFilterFromColumn,
  isScrollable,
  deleteButton = true,
  divider = true,
  className,
}) => {
  const columns = useMemo(() => {
    if (!tableData || tableData.length === 0) {
      return [];
    }
    const keys = Object.keys(tableData[0]);

    const filteredKeys = keys.filter((key) =>
      removeFilterFromColumn
        ? key !== filterBy &&
          key !== "_id" &&
          key !== "sectorNameAr" &&
          key !== "sectorNameEn"
        : true
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
    const filters = [...new Set(tableData?.map((row) => row[`${filterBy}`]))];
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
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  const dataToMap = isScrollable ? rows : page;
  return (
    <div>
      {tableData ? (
        <div className="">
          {(filterBy || searchBy) && (
            <>
              <div className=" grid grid-cols-6 gap-4 my-6 ">
                {filterBy && (
                  <div className="col-span-4">
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
                  <div className="col-span-3">
                    <SearchInput
                      placeholder={`Search by ${formatKey(searchBy)}`}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                )}
                {deleteButton && (
                  <div className="col-span-1 mx-auto ">
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
              </div>
              {divider && <Divider />}
            </>
          )}
          <div
            className={`overflow-x-auto  ${
              isScrollable ? "w-full  h-80  overflow-auto" : ""
            }`}
          >
            <table
              {...getTableProps()}
              className="whitespace-nowrap w-full overflow-x-auto  text-gray-600 dark:text-gray-400 "
            >
              <thead className="sticky bg-white top-0 uppercase font-bold text-gray-700 dark:text-gray-400">
                {headerGroups.map((headerGroup, index) => {
                  const { key, ...restHeaderGroupProps } =
                    headerGroup.getHeaderGroupProps();
                  return (
                    <tr
                      key={key} // Generate unique key for header group
                      className="border-b-4"
                      {...restHeaderGroupProps}
                    >
                      {headerGroup.headers.map((column, columnIndex) => {
                        const { key, ...restColumn } = column.getHeaderProps(
                          column.getSortByToggleProps()
                        );
                        return (
                          <th
                            key={key} // Generate unique key for each column within the header group
                            {...restColumn}
                            className="text-primary gap-2 cursor-pointer"
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
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>

              <tbody className="" {...getTableBodyProps()}>
                {dataToMap.map((row) => {
                  prepareRow(row);
                  const { key, ...restRowProps } = row.getRowProps(); // Destructure key and restRowProps from getRowProps()

                  return (
                    <tr
                      key={key} // Use key for each row
                      {...restRowProps} // Spread restRowProps for other row properties
                      className="border-b-2 hover:bg-gray-200 text-sm"
                    >
                      {row.cells.map((cell, index) => {
                        const columnsToCheck = [5, 6]; // Define columns to check for color change
                        const isColored = columnsToCheck.includes(index); // Check if this column needs coloring
                        const [symbol, name] = cell.value.split(" - ");
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={`${key}_cell_${index}`} // Generate unique key for each cell within the row
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
                                href={`/stock/${row.original.sectorNameEn}/${symbol}/information`}
                                className=""
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
              <span>
                Page
                <strong>
                  {pageIndex + 1} of {Math.ceil(filteredData.length / 5)}
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
        </div>
      ) : (
        <>
          <Skeleton />
        </>
      )}
    </div>
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
