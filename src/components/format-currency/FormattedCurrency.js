import React from "react";

const FormattedCurrency = ({ amount, currency = "USD" }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return <span className="m-0">{formatter.format(amount)}</span>;
};

export default FormattedCurrency;
