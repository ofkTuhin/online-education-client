export const tutorialReducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "FETCHING_SUCCESS":
      return {
        ...state,
        loading: false,
        tutorials: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EXPAND_TUTORIAL": {
      return {
        ...state,
        tutorials: state.tutorials.map((tutorial) => {
          return {
            ...tutorial,
            expand: action.id === tutorial.tutorial_id ? action.expand : false,
          };
        }),
      };
    }
    case "ADD_TUTORIAL":
      return {
        ...state,
        tutorials: [...state.tutorials, action.payload],
      };
    case "UPDATE_TUTORIAL":
      return {
        ...state,
        tutorials: state.tutorials.map((tutorial) => {
          return {
            ...tutorial,
            name:
              tutorial._id === action.id ? action.payload.name : tutorial.name,
            email:
              tutorial._id === action.id
                ? action.payload.email
                : tutorial.email,
            department:
              tutorial._id === action.id
                ? action.payload.department
                : tutorial.department,
            phone:
              tutorial._id === action.id
                ? action.payload.phone
                : tutorial.phone,
            designation:
              tutorial._id === action.id
                ? action.payload.designation
                : tutorial.designation,
            joining_date:
              tutorial._id === action.id
                ? action.payload.joining_date
                : tutorial.joining_date,
          };
        }),
      };
    case "DELETE_TUTORIAL":
      return {
        ...state,
        tutorials: state.tutorials.filter(
          (tutorial) => tutorial._id !== action.id
        ),
      };

    default:
      return state;
  }
};
