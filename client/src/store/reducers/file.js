import { FILE_UPLOAD, SAVE_RESULTS } from "../actions/file";

const initialState = {
  data: [],
  results: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case FILE_UPLOAD:
      return {
        ...state,
        data: actions.file,
      };

    case SAVE_RESULTS:
      return {
        ...state,
        results: actions.results,
      };

    default:
      return state;
  }
};
