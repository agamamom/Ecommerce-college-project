export const initialState = {
   category: [],
};

const reducer = (state, action) => {
   switch (action.type) {
      case "GET_ALL_CATEGORIES":
         return {
            ...state,
            category: [...state.category, action.item],
         };

      default:
         return state;
   }
};
export default reducer;
