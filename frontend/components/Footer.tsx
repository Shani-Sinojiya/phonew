import React, { SVGProps, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";

const Footer = () => {
  const { rating } = useSelector(
    (state: { rating: { rating: number } }) => state.rating
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SET_RATING_FROM_LOCAL_STORAGE" });
  }, []);

  return (
    <footer className="font-outfit">
      <div className="min-h-[5rem] bg-primary-0 flex justify-center items-center text-center gap-8">
        <div className="font-semibold text-white text-xl">
          Help us to improve
        </div>
        <div className="bg-[#5574E4] px-4 py-2 rounded-full flex flex-row text-[#FFEB35]">
          <Rating
            SVGclassName="inline-block"
            emptyClassName="flex"
            initialValue={rating}
            onClick={(rate) => {
              if (localStorage.getItem("rating") === null) {
                dispatch({ type: "SET_RATING", payload: rate });
              }
            }}
            size={34}
            readonly={rating === 0 ? false : true}
          />
        </div>
      </div>
      <div className="min-h-[4rem] font-normal bg-gray-100 flex justify-center items-center text-center">
        All the rights reserved and product by @DeadMad Technologies
      </div>
    </footer>
  );
};

export default Footer;
