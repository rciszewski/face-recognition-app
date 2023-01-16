import React from "react";

const Rank = ({userName, userEntries}) => {
  return (
    <div className="center flex flex-column">
      <div className="center white f3">
        {`${userName}, your current rank is...`}
      </div>
      <div className=" center white f1">
        {`${userEntries}`}
      </div>
    </div>
  );
}

export default Rank;