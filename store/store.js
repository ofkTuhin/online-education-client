// this file use for store all states that are genarate fron state folder
import { createContext, useContext, useState } from "react";
import teacherStates from "reducers/teacherState/teacherStates";
import studentStates from "reducers/studentState/studentStates";
import toastReducer from "reducers/toastReducer";
import tutorialStates from "reducers/tutorialstate.js/tutorialState";

const AppContext = createContext();
export const AppWrapper = ({ children }) => {
  const [user, setUser] = useState("");
  const [existMessage, setExistMessage] = useState();
  // user state
  const { teacherState, teacherDispatch } = teacherStates();
  const { studentDispatch, studentState } = studentStates();
  const { tutorialDispatch, tutorialState } = tutorialStates();

  // const { filterUserState, filterDisPatch } = filterUser(userState.users);
  //  toast
  const { toastDispatch, toastState } = toastReducer();
  // all state
  let state = {
    // teacher
    teacherState,
    teacherDispatch,
    // student
    studentDispatch,
    studentState,
    // toast
    toastDispatch,
    toastState,
    // login user
    user,
    setUser,
    // exists message
    existMessage,
    setExistMessage,
    tutorialDispatch,
    tutorialState,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
