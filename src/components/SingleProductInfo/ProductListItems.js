import React from "react";
import { Link } from "react-router-dom";
import FormattedCurrency from "../format-currency/FormattedCurrency";
import { useTranslation } from "react-i18next";

const ProductListItems = ({ product }) => {
  const { category, subs, shipping, color, brand, quantity, sold } = product;
  const { t } = useTranslation(["product"]);
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          <FormattedCurrency amount={product.price} currency="USD" />
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          {t("ProductListInfo.Category")}{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          {t("ProductListInfo.Sub Categories")}
          {subs.map((s) => (
            <div className="label label-default label-pill pull-xs-right">
              {s.name}
            </div>
          ))}
        </li>
      )}

      <li className="list-group-item">
        {t("ProductListInfo.Shipping")}{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        {t("ProductListInfo.Color")}{" "}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      <li className="list-group-item">
        {t("ProductListInfo.Brand")}{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        {t("ProductListInfo.Available")}{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
        {t("ProductListInfo.Sold")}{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
