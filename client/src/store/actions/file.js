export const FILE_UPLOAD = "FILE_UPLOAD";
export const SAVE_RESULTS = "SAVE_RESULTS";

export const file_upload = (file) => {
  return { type: FILE_UPLOAD, file };
};

export const save_results = (results) => {
  return { type: SAVE_RESULTS, results };
};
