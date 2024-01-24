// import HoverGraph from "./HoverGraph";

import Overlay from "@/components/utils/Overlay";
import Tooltip from "@/components/utils/Tooltip";
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
    <div>
      <table className="table-auto w-full text-center" responsive hover>
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
                    {/* <Overlay direction={"right"}>
                      {rowData.field}
                      <p>This content is visible on hover.</p>
                    </Overlay> */}
                    <Tooltip
                      orientation={"right"}
                      tooltipContent={
                        <Card>
                          <div>HELLO</div>asdsd
                        </Card>
                      }
                    >
                      {rowData.field}
                    </Tooltip>
                    {/* <Tooltip orientation={"right"} tooltipText={"right"}>
                      {rowData.field}
                    </Tooltip> */}
                    {/* <HoverGraph
                      text={rowData.field}
                      data={rowData.values}
                      years={firstRowValues}
                    /> */}
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
