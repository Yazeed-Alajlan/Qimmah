import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import InputSelect from "../inputs/InputSelect";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import SearchInput from "../inputs/SearchInput";
import Button from "../buttons/Button";
import Divider from "../Divider";
import Skeleton from "@/components/Skeleton";

const FinancialMetricsTable = ({
  tableData,
  tableColumns,
  isScrollable,
  handleRowClick,
}) => {
  if (!tableData) return <Skeleton />;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [data, setData] = useState(tableData);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setData(
      tableData.filter((item) =>
        item.symbol.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  const handleFilter = (event) => {
    if (event) {
      setFilterOption(event.value);
      setData(
        tableData.filter((item) =>
          item.sectorNameAr.toLowerCase().includes(event.value.toLowerCase())
        )
      );
    } else {
      setData(tableData);
    }
  };

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
      data: data,
      initialState: { pageIndex: 0, pageSize: 15 },
    },
    useSortBy,
    usePagination
  );

  const dataToMap = isScrollable ? rows : page;

  return (
    <div>
      {tableData ? (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <InputSelect
                placeholder="اختر القطاع"
                value={filterOption}
                options={Array.from(
                  new Set(tableData.map((item) => item.sectorNameAr))
                ).map((sectorName) => ({
                  value: sectorName,
                  label: sectorName,
                }))}
                onChange={handleFilter}
                isSearchable={true}
                labelDirection="hr"
              />
            </div>
            {/* <div className="w-1/2">
              <SearchInput
                placeholder={`ابحث باسم الشركة أو الرمز`}
                value={searchText}
                onChange={handleSearch}
              />
            </div> */}
          </div>
          <div className={`overflow-auto  ${isScrollable && "h-80"}`}>
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
      ) : (
        <Skeleton />
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

export default FinancialMetricsTable;
