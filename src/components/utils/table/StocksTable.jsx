import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import InputSelect from "../inputs/InputSelect";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import SearchInput from "../inputs/SearchInput";
import Button from "../buttons/Button";
import Divider from "../Divider";

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
          (row[`${searchBy}`] &&
            row[`${searchBy}`]
              .toLowerCase()
              .includes(searchText.toLowerCase())) ||
          row.tradingNameAr.toLowerCase().includes(searchText.toLowerCase())
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
          <div className={`overflow-auto  ${isScrollable && "h-screen"}`}>
            <table
              {...getTableProps()}
              className="w-full whitespace-nowrap  overflow-auto  text-gray-700 dark:text-gray-400 "
            >
              <thead className="sticky top-0 bg-white uppercase text-lg font-semibold text-primary dark:text-gray-400 border-b-4">
                {headerGroups.map((headerGroup, index) => {
                  const { key, ...restHeaderGroupProps } =
                    headerGroup.getHeaderGroupProps(); // Destructure key and restHeaderGroupProps from getHeaderGroupProps()
                  return (
                    <tr
                      key={`headerRow_${index}`} // Use a unique key for each header row
                      {...restHeaderGroupProps}
                    >
                      {headerGroup.headers.map((column, columnIndex) => {
                        const { key, ...restColumn } = column.getHeaderProps(
                          column.getSortByToggleProps()
                        ); // Destructure key and restColumn from getHeaderProps()
                        return (
                          <th
                            key={key} // Use key or generate a unique key for each header cell
                            {...restColumn}
                            className=" px-4 gap-2 cursor-pointer"
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
                      className="border-b-2 hover:bg-gray-200 text-md"
                    >
                      {row.cells.map((cell, cellIndex) => {
                        const columnId = cell.column.id; // Get the column ID
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={`cell_${rowIndex}_${cellIndex}`} // Generate unique key for each cell
                            className={`px-4 py-2 ${getColorBasedOnChange(
                              cell.value,
                              columnId
                            )}`}
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

const getColorBasedOnChange = (value, columnId) => {
  if (columnId === "التغيير" || columnId === "التغيير (%)") {
    return parseFloat(value) < 0 ? "text-red-500" : "text-green-500";
  }
  return ""; // Return empty string for other columns
};

export default StocksTable;
