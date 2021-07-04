import { user } from "./user";
import { event } from "./event";
import { gift } from "./gift";

const apiUrl = process.env.REACT_APP_API_URL;

export default (function api() {
  return {
    user: user(`${apiUrl}/users`),
    event: event(`${apiUrl}/events`),
    gift: gift(`${apiUrl}/gifts`),
  };
})();
