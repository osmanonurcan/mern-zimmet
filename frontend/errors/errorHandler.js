import { notifySuccess, notifyError } from "../notify";
// import { removeToken } from "../localStorage";

export const errorHandler = (error) => {
  let errorMsg = "Someting went wrong please try again later...";
  if (error.response?.data?.msg) {
    errorMsg = error.response.data.msg;
  } else if (error.message) {
    errorMsg = error.message;
    // removeToken();
  }

  notifyError(errorMsg);
};
