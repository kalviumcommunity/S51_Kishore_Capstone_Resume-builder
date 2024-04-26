import { UPDATE_EDUCATION, ADD_NEW_EDUCATION } from "../Actions/actionTypes";

const initialState = {
  educationFormData: [
    {
      schoolName: "University of Fictional Studies",
      schoolLocation: "Fiction City",
      startDate: "September 2010",
      endDate: "May 2014",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
    },
  ],
};

const educationInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EDUCATION:
      return {
        ...state,
        educationFormData: state.educationFormData.map((formData, index) =>
          index === action.index ? { ...formData, ...action.payload } : formData
        ),
      };
    case ADD_NEW_EDUCATION:
      return {
        ...state,
        educationFormData: [
          ...state.educationFormData,
          { ...initialState.educationFormData[0] },
        ],
      };

    default:
      return state;
  }
};

export default educationInfoReducer;
