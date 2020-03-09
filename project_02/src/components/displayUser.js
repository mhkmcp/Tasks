import React from "react";
const DisplayUser = ({ data, index }) => {
  const { firstName, lastName, email } = data;
  return (
    <div className="userIndex">
      <li>{index}</li>
      <li>{firstName}</li>
      <li>{lastName}</li>
      <li>{email}</li>
    </div>
  );
};

export default DisplayUser;
