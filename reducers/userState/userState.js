import { Axios } from "@lib/axios";
import { useEffect, useReducer } from "react";
import { userReducer } from "reducers/userState/userReducer";

const userStates = () => {
  const initialState = {
    loading: true,
    users: [],
    error: false,
  };

  const [userState, userDispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    userDispatch({
      type: "FETCHING_START",
    });
    Axios.get("admin")
      .then((data) =>
        userDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.result,
        })
      )
      .catch(() => userDispatch({ type: "FETCHING_FAILED" }));
  }, []);

  return {
    userState: userState,
    userDispatch: userDispatch,
  };
};

export default userStates;
