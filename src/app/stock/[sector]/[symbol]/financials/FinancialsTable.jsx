// import HoverGraph from "./HoverGraph";

import Tooltip from "@/components/utils/Tooltip";
import HoverGraph from "./HoverGraph";
import { Card } from "@/components/utils/cards/Card";

const FinancialsTable = ({ title, data, header }) => {
  const keys = data.length > 0 ? Object.keys(data[0]) : [];
  // Transpose the data
  const transposedData = keys.map((key) => ({
    field: key,
    values: data.map((entry) => entry[key]),
  }));
  const firstRowValues = transposedData[0].values;

  return (
    <div className="w-full  overflow-x-auto">
      <table className="w-full text-center h-min  text-lg">
        <thead>
          {header ? (
            <tr className="border-b-4">
              <th>الشركة</th>
              <th colSpan={2}>{header[0]}</th>
              <th colSpan={2}>{header[1]}</th>
            </tr>
          ) : (
            <></>
          )}
          <tr className="border-b-4">
            <th>{title}</th>
            {firstRowValues.map((value, index) => (
              <th key={index}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transposedData.slice(1).map((rowData) => (
            <tr className=" border-b-2" key={rowData.field}>
              {rowData.field !== "all_figures_in" &&
              rowData.field !== "all_currency_in" &&
              rowData.field !== "last_update_date" ? (
                <>
                  <td>
                    <Tooltip
                      orientation={"left"}
                      tooltipContent={
                        <HoverGraph
                          text={rowData.field}
                          data={rowData.values}
                          years={firstRowValues}
                        />
                      }
                    >
                      {rowData.field}
                    </Tooltip>
                  </td>
                  {rowData.values.map((value, index) => (
                    <td
                      key={index}
                      className={
                        // Change to black if it includes "-" and has a length of 1
                        value.includes("-") && value.length === 1
                          ? ""
                          : // Change to red if it includes "-" but doesn't meet the first condition
                          value.includes("-")
                          ? "text-danger"
                          : // Make it green for all other cases
                            "text-success"
                      }
                    >
                      {value}
                    </td>
                  ))}
                </>
              ) : (
                <>
                  <td>{rowData.field}</td>
                  {rowData.values.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialsTable;
