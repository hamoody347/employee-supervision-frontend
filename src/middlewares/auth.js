import axios from "axios";

export default async function auth({ next }) {
  if (localStorage.getItem("token") !== null) {
    if (localStorage.getItem("user") !== null) {
      // console.log('User is authenticated. Proceeding to the next route.');
      next();
    } else {
      try {
        const response = await axios.get("api/user");
        localStorage.setItem("user", JSON.stringify(response.data));
        // console.log('User data fetched. Proceeding to the next route.');
        next();
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 419)
        ) {
          // console.log('User authentication failed. Redirecting to login page.');
          next({ name: "sign-in" });
        } else {
          // console.error('An error occurred while fetching user data:', error);
          next(); // Proceed to the next route even if user data couldn't be fetched.
        }
      }
    }
  } else {
    // console.log('User is not authenticated. Redirecting to login page.');
    next({ name: "sign-in" });
  }
}
