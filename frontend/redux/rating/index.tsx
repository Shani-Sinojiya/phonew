const initialState = {
  rating: 0,
};

type RatingAction = {
  type: string;
  payload: number;
};

const rating = (state = initialState, action: RatingAction) => {
  switch (action.type) {
    case "SET_RATING":
      localStorage.setItem("rating", action.payload.toString());
      return { ...state, rating: action.payload };

    case "SET_RATING_FROM_LOCAL_STORAGE":
      const rating = localStorage.getItem("rating");
      return { ...state, rating: rating ? parseInt(rating) : 0 };
      
    default:
      return state;
  }
};

export default rating;
