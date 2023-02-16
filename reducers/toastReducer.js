import { useReducer } from "react";
// This file maintain toast notification after add,delete or update data
const toastReducer = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "TOAST": {
        return {
          ...state,
          isToast: true,
          message: action.message,
        };
      }
      case "TOAST_END": {
        return {
          ...state,
          isToast: false,
        };
      }
    }
  };
  const initialState = {
    isToast: false,
    message: "",
  };
  const [toastState, toastDispatch] = useReducer(reducer, initialState);
  return {
    toastState,
    toastDispatch,
  };
};

export default toastReducer;
