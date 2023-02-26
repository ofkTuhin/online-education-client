import { Axios } from "@lib/axios";
import { useEffect, useReducer } from "react";
import { tutorialReducer } from "./tutorialReducer";

const tutorialStates = () => {
  const initialState = {
    loading: true,
    tutorials: [],
    error: false,
  };

  const [tutorialState, tutorialDispatch] = useReducer(
    tutorialReducer,
    initialState
  );
  useEffect(() => {
    tutorialDispatch({
      type: "FETCHING_START",
    });
    Axios.get("class")
      .then((data) =>
        tutorialDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.result,
        })
      )
      .catch(() => tutorialDispatch({ type: "FETCHING_FAILED" }));
  }, []);

  return {
    tutorialState: tutorialState,
    tutorialDispatch: tutorialDispatch,
  };
};

export default tutorialStates;
