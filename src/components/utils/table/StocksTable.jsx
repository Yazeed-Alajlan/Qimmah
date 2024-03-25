import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Card } from "../cards/Card";
import InputSelect from "../inputs/InputSelect";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import SearchInput from "../inputs/SearchInput";
import Button from "../buttons/Button";
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
  handleRowClick,
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
    <div>
      {tableData && (
        <div className="">
          {(filterBy || searchBy) && (
            <>
              <div className=" grid md:grid-cols-7 sm:grid-cols-3 gap-4 ">
                {filterBy && (
                  <div className="col-span-2">
                    <InputSelect
                      placeholder="اختر القطاع"
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
                  <div className="col-span-4">
                    <SearchInput
                      placeholder={`ابحث باسم الشركة أو الرمز`}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                )}
                <div className="col-span-1 md:mx-auto ">
                  <Button
                    variant="danger"
                    text={"حذف"}
                    onClick={() => {
                      setFilterOption("");
                      setSearchText("");
                    }}
                  />
                </div>
              </div>
              <Divider />
            </>
          )}
          <div
            className={`overflow-x-auto  ${
              isScrollable
                ? "w-full  h-screen  overflow-auto"
                : " overflow-auto"
            }`}
          >
            <table
              {...getTableProps()}
              className="whitespace-nowrap w-full overflow-x-auto  text-gray-600 dark:text-gray-400 "
            >
              <thead className="sticky top-0 uppercase font-bold text-gray-700 dark:text-gray-400">
                {headerGroups.map((headerGroup, index) => {
                  const { key, ...restHeaderGroupProps } =
                    headerGroup.getHeaderGroupProps(); // Destructure key and restHeaderGroupProps from getHeaderGroupProps()
                  return (
                    <tr
                      key={`headerRow_${index}`} // Use a unique key for each header row
                      {...restHeaderGroupProps}
                      className="border-b-4"
                    >
                      {headerGroup.headers.map((column, columnIndex) => {
                        const { key, ...restColumn } = column.getHeaderProps(
                          column.getSortByToggleProps()
                        ); // Destructure key and restColumn from getHeaderProps()
                        return (
                          <th
                            key={key} // Use key or generate a unique key for each header cell
                            {...restColumn}
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
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>

              <tbody className="" {...getTableBodyProps()}>
                {dataToMap.map((row, rowIndex) => {
                  prepareRow(row);
                  const { key, ...restRowProps } = row.getRowProps(); // Destructure key and restRowProps from getRowProps()

                  return (
                    <tr
                      key={`row_${rowIndex}`} // Use a unique key for each row
                      {...restRowProps}
                      onClick={() =>
                        handleRowClick
                          ? handleRowClick(row.original.symbol)
                          : null
                      }
                      className="border-b-2 hover:bg-gray-200 text-sm"
                    >
                      {row.cells.map((cell, cellIndex) => {
                        const columnsToCheck = [5, 6]; // Define columns to check for color change
                        const isColored = columnsToCheck.includes(cellIndex); // Check if this column needs coloring
                        const [symbol, name] = cell.value.split(" - ");
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={`cell_${rowIndex}_${cellIndex}`} // Generate unique key for each cell
                            className={
                              isColored
                                ? cell.value.includes("-")
                                  ? "text-danger px-6 py-3"
                                  : "text-success px-6 py-3"
                                : "text-black px-6 py-3" // Black color for columns not in columnsToCheck
                            }
                          >
                            {cellIndex === 0 ? (
                              <Link
                                href={`/stock/${row.original.sectorNameAr}/${symbol}/information`}
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
            <div className="flex justify-center items-center mt-2 gap-4">
              <Button
                variant="primary"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                text="السابق"
              />
              <span>
                الصفحة
                <span className="font-bold ms-2">
                  {pageIndex + 1} من {Math.ceil(filteredData.length / 15)}
                </span>
              </span>
              <Button
                variant="primary"
                onClick={() => nextPage()}
                disabled={!canNextPage}
                text="التالي"
              />
            </div>
          )}
        </div>
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

export default StocksTable;
