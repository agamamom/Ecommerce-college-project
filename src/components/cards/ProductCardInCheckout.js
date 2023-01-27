import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";

const ProductCardInCheckout = ({ p }) => {
  return (
    <tbody>
      <tr>
        <td className="align-middle">
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td className="align-middle">
          <div className="text-[15px]">{p.title}</div>
        </td>
        <td className="align-middle">
          <div className="font-extrabold">${p.price}</div>
        </td>
        <td className="align-middle">
          <div className="text-[15px]">{p.brand}</div>
        </td>
        <td className="align-middle">{p.count}</td>
        <td className="align-middle">Delete Icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
