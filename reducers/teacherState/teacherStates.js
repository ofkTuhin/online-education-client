import { Axios } from "@lib/axios";
import { useSession } from "next-auth/react";
import { useEffect, useReducer } from "react";
import { teacherReducer } from "./teacherReducer";

const teacherStates = () => {
  const initialState = {
    loading: true,
    teachers: [],
    error: false,
  };
  const { data: session } = useSession() || {};
  const { email } = session?.user?.user || {};

  const [teacherState, teacherDispatch] = useReducer(
    teacherReducer,
    initialState
  );
  useEffect(() => {
    teacherDispatch({
      type: "FETCHING_START",
    });
    Axios.get("teacher", {
      headers: {
        user: email,
      },
    })
      .then((data) =>
        teacherDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.result,
        })
      )
      .catch(() => teacherDispatch({ type: "FETCHING_FAILED" }));
  }, []);

  return {
    teacherState: teacherState,
    teacherDispatch: teacherDispatch,
  };
};

export default teacherStates;
