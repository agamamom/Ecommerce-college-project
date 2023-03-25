import React from "react";
import { useTranslation } from "react-i18next";

const ShowPaymentInfo = ({ order }) => {
   const { t } = useTranslation(["adminNav"]);
   return (
      <div>
         <p className="whitespace-normal text-left">
            <span>
               {t("PaymentInfo.Order Id")}: {order.paymentIntent.id}
            </span>
            {" --- "}
            <span>
               {t("PaymentInfo.Amount")}:{" --- "}
               {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
               })}
            </span>
            {" --- "}
            <span>
               {t("PaymentInfo.Amount")}:{" "}
               {order.paymentIntent.currency.toUpperCase()}
            </span>
            {" --- "}
            <span>
               {t("PaymentInfo.Amount")}:{" "}
               {order.paymentIntent.payment_method_types[0]}
            </span>
            {" --- "}
            <span>
               {t("PaymentInfo.Payment")}:{" "}
               {order.paymentIntent.status.toUpperCase()}
            </span>
            {" --- "}
            <span>
               {t("PaymentInfo.Orderd on")}:{" --- "}
               {new Date(order.paymentIntent.created * 1000).toLocaleString()}
            </span>
            {" --- "}
            <span className="badge bg-primary text-white">
               {t("PaymentInfo.STATUS")}: {order.orderStatus}
            </span>
         </p>
      </div>
   );
};

export default ShowPaymentInfo;
