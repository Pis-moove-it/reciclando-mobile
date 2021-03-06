import { actionTypes } from '../actions/PocketActions';

export const initialState = {
  pockets: [],
  pocketsQuantity: false,
  isEnd: false,
  isLoading: false,
};

const pocketListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POCKETS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.POCKETS_RESET:
      return initialState;
    case actionTypes.POCKETS_SUCCESS:
      return {
        ...state,
        pockets: action.pockets,
        pocketsQuantity: action.pocketsQuantity,
        isLoading: false,
      };
    case actionTypes.POCKETS_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.POCKETS_END:
      return {
        ...state,
        isEnd: action.isEnd,
      };
    default:
      return state;
  }
};

export default pocketListReducer;
