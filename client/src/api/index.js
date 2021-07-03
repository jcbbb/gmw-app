import { user } from "./user";
import { event } from "./event";

const apiUrl = process.env.REACT_APP_API_URL;

export default (function api() {
  return {
    user: user(`${apiUrl}/users`),
    event: event(`${apiUrl}`),
  };
})();
