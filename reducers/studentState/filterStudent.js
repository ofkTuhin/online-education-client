import { useReducer } from "react";
import studentState from "./studenttState";

// get single state value
const filterStudent = () => {
  const {
    studentState: { students },
  } = studentState();
  const filterReducer = (state, action) => {
    const filterStudent = students.filter(
      (student) => student._id === action.id
    );

    switch (action.type) {
      case "SINGLE_Student":
        return {
          ...state,
          students: filterStudent,
        };
      default:
        return state;
    }
  };
  const initialState = {
    students: [],
  };
  const [filterStudentState, filterDisPatch] = useReducer(
    filterReducer,
    initialState
  );

  return { filterDisPatch, filterStudentState };
};

export default filterStudent;
