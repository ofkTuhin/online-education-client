import { useReducer } from "react";
import userState from "./tutorialState";

// get single state value
const filterUser = () => {
  const {
    userState: { users },
  } = userState();
  const filterReducer = (state, action) => {
    const filterUser = users.filter((user) => user._id === action.id);

    switch (action.type) {
      case "SINGLE_USER":
        return {
          ...state,
          users: filterUser,
        };
      default:
        return state;
    }
  };
  const initialState = {
    users: [],
  };
  const [filterUserState, filterDisPatch] = useReducer(
    filterReducer,
    initialState
  );

  return { filterDisPatch, filterUserState };
};

export default filterUser;
