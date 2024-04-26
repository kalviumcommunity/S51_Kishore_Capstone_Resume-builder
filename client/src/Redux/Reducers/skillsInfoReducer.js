import { UPDATE_SKILLS, ADD_NEW_SKILLS } from "../Actions/actionTypes";

const initialState = {
  skillsFormData: [{ skills: "", expertiseLevel: "" }],
};

const skillsInfoReducer = (state = initialState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case UPDATE_SKILLS:
      return {
        ...state,
        skillsFormData: state.skillsFormData.map((formData, index) =>
          index === action.index ? { ...formData, ...action.payload } : formData
        ),
      };
    case ADD_NEW_SKILLS:
      return {
        ...state,
        skillsFormData: [...state.skillsFormData, {...initialState.skillsFormData[0] }]
      }
    default:
      return state;
  }
};

export default skillsInfoReducer;
