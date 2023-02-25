import { Axios } from "@lib/axios";
import { useSession } from "next-auth/react";
import { useEffect, useReducer } from "react";
import { studentReducer } from "./studentReducer";

const studentStates = () => {
  const initialState = {
    loading: true,
    students: [],
    error: false,
  };
  const { data: session } = useSession() || {};
  const { email } = session?.user?.user || {};

  const [studentState, studentDispatch] = useReducer(
    studentReducer,
    initialState
  );
  useEffect(() => {
    studentDispatch({
      type: "FETCHING_START",
    });
    Axios.get("student", {
      headers: {
        user: email,
      },
    })
      .then((data) =>
        studentDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.result,
        })
      )
      .catch(() => studentDispatch({ type: "FETCHING_FAILED" }));
  }, []);

  return {
    studentState: studentState,
    studentDispatch: studentDispatch,
  };
};

export default studentStates;
