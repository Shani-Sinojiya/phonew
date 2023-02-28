import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";

const Footer = () => {
  const { rating } = useSelector(
    (state: { rating: { rating: number } }) => state.rating
  );
  const dispatch = useDispatch();
  const [serverRating, setServerRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const SeraverSetRating = async (rate: number) => {
    const response = await fetch(process.env.API_URL + "/rating", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          rating: (rate + serverRating) / 2,
          rating_counter: totalRatings + 1,
        },
      }),
    });
    const { data } = await response.json();
  };

  useEffect(() => {
    const fetchFromServer = async () => {
      const response = await fetch(
        process.env.API_URL +
          "/rating?fields[0]=rating&fields[1]=rating_counter",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await response.json();
      setTotalRatings(
        data.attributes.rating_counter ? data.attributes.rating_counter : 0
      );
      setServerRating(data.attributes.rating ? data.attributes.rating : 0);
    };
    fetchFromServer();
    dispatch({ type: "SET_RATING_FROM_LOCAL_STORAGE" });
  }, []);

  return (
    <footer className="font-outfit left-0 w-screen">
      <div className="min-h-[5rem] bg-primary-0 flex justify-center items-center text-center gap-8">
        <div className="font-semibold text-white text-xl max-md:text-lg">
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
                SeraverSetRating(rate);
              }
            }}
            size={24}
            readonly={rating === 0 ? false : true}
          />
        </div>
      </div>
      <div className="min-h-[4rem] font-normal bg-gray-100 max-md:text-xs flex justify-center items-center text-center">
        All the rights reserved and product by @DeadMad Technologies
      </div>
    </footer>
  );
};

export default Footer;
