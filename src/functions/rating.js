import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);

    let highest = length * 5;

    let result = (totalReduced * 5) / highest;

    return (
      <div className="">
        <span className="flex items-center">
          <StarRating
            starDimension="18px"
            starSpacing="1px"
            starRatedColor="yellow"
            rating={result}
            editing={false}
          />
          <div className="text-[16px] ml-[7px]">({p.ratings.length})</div>
        </span>
      </div>
    );
  }
};
