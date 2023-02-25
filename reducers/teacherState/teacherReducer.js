export const teacherReducer = (state, action) => {
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
        teachers: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EXPAND_teacher": {
      return {
        ...state,
        teachers: state.teachers.map((teacher) => {
          return {
            ...teacher,
            expand: action.id === teacher.teacher_id ? action.expand : false,
          };
        }),
      };
    }
    case "ADD_teacher":
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
      };
    case "UPDATE_teacher":
      return {
        ...state,
        teachers: state.teachers.map((teacher) => {
          return {
            ...teacher,
            name:
              teacher._id === action.id ? action.payload.name : teacher.name,
            email:
              teacher._id === action.id ? action.payload.email : teacher.email,
            department:
              teacher._id === action.id
                ? action.payload.department
                : teacher.department,
            phone:
              teacher._id === action.id ? action.payload.phone : teacher.phone,
            designation:
              teacher._id === action.id
                ? action.payload.designation
                : teacher.designation,
            joining_date:
              teacher._id === action.id
                ? action.payload.joining_date
                : teacher.joining_date,
          };
        }),
      };
    case "DELETE_teacher":
      return {
        ...state,
        teachers: state.teachers.filter((teacher) => teacher._id !== action.id),
      };

    default:
      return state;
  }
};
