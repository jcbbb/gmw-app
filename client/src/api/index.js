import { user } from "./user";

const apiUrl = process.env.REACT_APP_API_URL;

export default (function api() {
  return {
    user: user(`${apiUrl}/users`),
  };
})();
