import axios from "axios";
// import router from "@/router";
import showSwal from "/src/mixins";

const development = "local";

// Base URL
if (development === "local") {
  axios.defaults.baseURL = "http://localhost:8000"; // Local Testing Laravel
}

if (development === "server") {
  axios.defaults.baseURL = "https://api.hosting.com/"; // Deployment Calls
}

function extractAndFormatErrorMessages(errorData) {
  const errorMessages = [];

  for (const key in errorData) {
    if (errorData[key]) {
      errorData[key].forEach((message) => {
        // Remove the word "id" from the error message
        const cleanedMessage = message
          .replace(/ id /g, " ")
          .replace(/^The\s+/i, "");
        const CapitalizedMessage =
          cleanedMessage.charAt(0).toUpperCase() + cleanedMessage.slice(1);
        errorMessages.push(CapitalizedMessage);
      });
    }
  }

  // Join the error messages with line breaks
  return errorMessages.join("|");
}

// Error Handling
axios.interceptors.response.use(
  (response) => response, // Do nothing on successful responses
  (error) => {
    if (error.response && error.response.status === 422) {
      const errorsMessage = extractAndFormatErrorMessages(
        error.response.data.errors
      );
      showSwal.methods.validationError(errorsMessage);
    }
    // if (error.response && error.response.status === 401) {
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("token");
    //   axios.defaults.headers.common = null;
    //   router.push({ name: "Login" });
    //   showSwal.methods.validationError(
    //     "Something went wrong, please log in again."
    //   );
    // }
    return Promise.reject(error);
  }
);

export default axios;
