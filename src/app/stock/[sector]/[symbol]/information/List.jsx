import React from "react";

const List = ({ data }) => {
  console.log(data);
  return (
    <div className="overflow-y-auto h-80">
      {data &&
        data.map((item) => {
          return (
            <div className="flex justify-between text-xl border-b-2 py-4 px-2 ">
              <div className="flex flex-col">
                <span className="font-semibold"> {item.name}</span>
                <span className="ms-2 text-base text-gray-500">
                  {" "}
                  {item.info}
                </span>
              </div>
              <div>
                <span className="text-primary font-bold"> {item.value}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default List;
