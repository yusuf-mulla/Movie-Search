const initialState = {
  getApi: [],
  searchData: "",
};
export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_API":
      return {
        ...state,
        getApi: action.payload,
      };
      break;
    case "TAKE_SEARCH_DATA":
      return {
        ...state,
        searchData: action.payload,
      };
      break;
  }

  return state;
};
