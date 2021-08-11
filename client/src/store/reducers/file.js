import { FILE_UPLOAD } from "../actions/file";

const initialState = {
  data: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case FILE_UPLOAD:
      return {
        ...state,
        data: actions.file,
      };
    default:
      return state;
  }
};
