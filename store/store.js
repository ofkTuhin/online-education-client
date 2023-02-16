// this file use for store all states that are genarate fron state folder

import { createContext, useContext, useState } from "react";
import userStates from "reducers/userState/userState";
import filterUser from "reducers/userState/filterUser";
import toastReducer from "reducers/toastReducer";

const AppContext = createContext();
export const AppWrapper = ({ children }) => {
  const [user, setUser] = useState("");
  // user state
  const { userState, userDispatch } = userStates();
  const { filterUserState, filterDisPatch } = filterUser(userState.users);
  //  toast
  const { toastDispatch, toastState } = toastReducer();
  // all state
  let state = {
    // users
    userState,
    userDispatch,
    // for single user
    filterUserState,
    filterDisPatch,
    // toast
    toastDispatch,
    toastState,
    user,
    setUser,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
