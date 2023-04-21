import React from "react";
import _ from "lodash";

export default function Showstw({ data }) {
  console.log("data", data);
  return (
    <div>
      {_.map(data, (people, index) => (
        <div>
          <div>
            {index + 1} : {people?.name} {people?.department}
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
}
