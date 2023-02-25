export const studentReducer = (state, action) => {
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
        students: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EXPAND_STUDENT": {
      return {
        ...state,
        students: state.students.map((student) => {
          return {
            ...student,
            expand: action.id === student.student_id ? action.expand : false,
          };
        }),
      };
    }
    case "ADD_STUDENT":
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case "UPDATE_STUDENT":
      return {
        ...state,
        students: state.students.map((student) => {
          return {
            ...student,
            name:
              student._id === action.id ? action.payload.name : student.name,
            email:
              student._id === action.id ? action.payload.email : student.email,
            department:
              student._id === action.id
                ? action.payload.department
                : student.department,
            phone:
              student._id === action.id ? action.payload.phone : student.phone,
            designation:
              student._id === action.id
                ? action.payload.designation
                : student.designation,
            joining_date:
              student._id === action.id
                ? action.payload.joining_date
                : student.joining_date,
          };
        }),
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter((student) => student._id !== action.id),
      };

    default:
      return state;
  }
};
